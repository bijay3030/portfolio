---
title: 'Reliable file intake with Sidekiq: validate, route, retry'
description: 'A pattern for processing uploaded files in Rails with Sidekiq so uploads return instantly, failures retry safely, and nothing is processed twice.'
date: 2026-10-02
draft: true
tags:
  - Ruby on Rails
  - Sidekiq
  - AWS S3
---

<!-- REVIEW BEFORE PUBLISHING: this draft is based on the Helios case study. Replace the example code with what you actually did, add a real incident or number (e.g. "retries recovered X% of failed uploads"), then set draft: false. -->

On a medical translation platform I worked on, every job starts with a client uploading files. Those files have to be stored, checked, and routed to the right language-pair workflow before anyone can price the job. Doing that inside the web request is a recipe for timeouts. Here is the background-job pattern that kept intake fast and reliable.

## 1. Accept the upload, then get out of the way

The request only stores the file in S3 and records it. Everything else happens in the background:

```ruby
class UploadsController < ApplicationController
  def create
    upload = current_job.uploads.create!(file: params[:file], status: :received)
    IntakeWorker.perform_async(upload.id)
    render json: { id: upload.id, status: upload.status }, status: :accepted
  end
end
```

## 2. Make the worker idempotent

Sidekiq retries failed jobs, and a job can occasionally run twice. The worker must be safe to run more than once:

```ruby
class IntakeWorker
  include Sidekiq::Worker
  sidekiq_options retry: 5

  def perform(upload_id)
    upload = Upload.find(upload_id)
    return if upload.processed? # already done: running again is a no-op

    upload.with_lock do
      Intake::Validate.call(upload)
      Intake::Route.call(upload)
      upload.update!(status: :processed)
    end
  end
end
```

The status check plus the row lock means a duplicate run either waits or exits immediately.

## 3. Separate "retry later" from "this file is bad"

Not every failure should be retried. A timeout talking to S3 is worth retrying; a corrupt or unsupported file is not:

```ruby
module Intake
  class InvalidFile < StandardError; end

  class Validate
    def self.call(upload)
      raise InvalidFile, 'Unsupported format' unless upload.supported_format?
      # ... other checks
    end
  end
end

# In the worker:
rescue Intake::InvalidFile => e
  upload.update!(status: :rejected, error: e.message) # tell the user, don't retry
```

## 4. Tell people what happened

When the status changes, broadcast it so project managers see progress without refreshing:

```ruby
after_update_commit -> { broadcast_replace_to job, target: dom_id(self) }
```

## Takeaways

- Keep the request short: store, enqueue, respond with `202 Accepted`.
- Design every worker to be safe to run twice.
- Retry transient errors; surface permanent ones to the user immediately.
- Push status updates instead of making people poll.
