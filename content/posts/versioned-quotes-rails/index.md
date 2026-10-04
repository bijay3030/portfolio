---
title: 'Versioned records in Rails: keeping every revision of a price quote'
description: 'How to model quotes that change over time in Rails and PostgreSQL so every revision is kept, comparable, and safe to approve.'
date: 2026-10-01
draft: true
slug: /writing/versioned-quotes-rails
tags:
  - Ruby on Rails
  - PostgreSQL
  - Data modeling
---

<!-- REVIEW BEFORE PUBLISHING: this draft is based on the Quoting case study. Replace the example code with the pattern you actually used (or say where you did it differently), add a real lesson learned, then set draft: false. -->

When a client asks "what did the quote say last Tuesday?", _"we overwrote it"_ is not a good answer. On a quoting platform I built for a healthcare localization company, every change to a quote had to be kept, compared, and approved. This post walks through the data model that makes that easy in Rails.

## The problem with editing in place

The obvious model is a `quotes` table with a `total` column and some `line_items`. Edit the line items, save, done. It breaks down quickly:

- You lose history the moment someone saves.
- Approvals become ambiguous: _which_ version did the client approve?
- Two project managers editing the same quote can silently overwrite each other.

## Quotes and quote versions

Split the stable identity of the quote from its contents:

```ruby
class Quote < ApplicationRecord
  has_many :versions, -> { order(:number) }, class_name: 'QuoteVersion'
  belongs_to :approved_version, class_name: 'QuoteVersion', optional: true

  def current_version
    versions.last
  end
end

class QuoteVersion < ApplicationRecord
  belongs_to :quote
  has_many :line_items, dependent: :destroy

  validates :number, uniqueness: { scope: :quote_id }

  # Versions are never edited after creation.
  def readonly?
    persisted?
  end
end
```

Every edit creates a new `QuoteVersion` with its own copy of the line items. The quote itself only points at the versions and, once approved, at the exact version the client accepted.

## Creating a new version

Wrap the copy in a transaction and let PostgreSQL enforce ordering:

```ruby
class Quotes::Revise
  def self.call(quote:, changes:, author:)
    Quote.transaction do
      quote.lock!
      previous = quote.current_version
      version = quote.versions.create!(number: previous.number + 1, author: author)

      previous.line_items.each do |item|
        version.line_items.create!(item.attributes.except('id', 'quote_version_id'))
      end

      Quotes::ApplyChanges.call(version: version, changes: changes)
      version
    end
  end
end
```

`quote.lock!` takes a row lock, so two people revising at the same moment get versions `n+1` and `n+2` instead of a race.

## What this buys you

- **History and diffs for free.** Comparing two versions is a query, not an archaeology project.
- **Unambiguous approvals.** `approved_version_id` records exactly what the client said yes to.
- **Safe real-time editing.** Broadcast "new version created" over ActionCable, and every open editor can refresh to the latest version instead of overwriting it.

## Trade-offs

Copying line items on every revision uses more rows. For quotes with tens of line items that is a non-issue; for very large documents you would store diffs instead. Pick the simple version first and measure.
