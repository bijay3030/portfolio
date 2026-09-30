---
date: '1'
updated: '2026-09-30'
title: 'AListEngine'
slug: '/projects/alistengine/'
cover: './alistengine-screen-2.png'
diagram: './architecture.svg'
ogImage: '/og/alistengine.png'
external: ''
github: ''
cta: ''
summary: 'AListEngine is an AI tool that turns product photos into ready-to-publish listings for e-commerce stores and auction houses. It drafts the title, description, and price, then exports to Shopify, AuctionFlex, and LiveAuctioneers.'
description: 'Case study: AListEngine, a Rails + React tool that uses AI vision and text generation to turn product photos into marketplace-ready listings in minutes — built by Bijay Subedi at Truemark.'
client: 'E-commerce sellers and auction houses'
position: 'Full-stack engineer (Rails + React) at Truemark'
domain: 'AI E-commerce Listing Automation'
role: 'AI Listing Generator'
projectTypes:
  - Online sellers
  - Auction houses
  - High-volume e-commerce teams
tech:
  - Ruby on Rails
  - React.js
  - AI vision + text generation
  - Rules engine
  - Shopify
  - AuctionFlex
  - LiveAuctioneers
contribution:
  - Built the photo-to-draft pipeline that calls AI vision and text models
  - Added a rules engine for seller-specific fields and marketplace formatting
  - Integrated exports to Shopify, AuctionFlex, and LiveAuctioneers
estimationInputs:
  - Product photos and category context
  - Seller-specific custom fields
  - Marketplace export requirements
workflow:
  - Upload product photos and basic context
  - AI drafts the title, description, and suggested price
  - Seller reviews, edits, and exports to each marketplace
outcomes:
  - Listing creation dropped from hours to minutes
  - More consistent listing quality across sellers and channels
  - Sellers and auction teams can list far more items per day
---

<!-- REVIEW: every statement below is based on the project summary and tech stack. Correct anything that is not accurate, name the AI provider/model if you can, and add numbers (e.g. "listings per hour: 4 → 60") wherever you have them. -->

## The problem

Auction houses and online sellers list hundreds of one-off items: antiques, collectibles, second-hand goods. Each one needs a good title, a detailed description with item specifics, and a sensible starting price — and each marketplace wants the data in a slightly different format.

Writing listings by hand took **hours per batch**, and quality depended on who wrote them.

## What I built

AListEngine turns a few photos into a finished listing:

- **Photo upload.** Sellers upload photos with a category and any seller-specific fields.
- **AI drafting.** AI vision and text models identify the item and draft the title, description, item specifics, and a suggested starting price.
- **Rules engine.** Seller-specific fields and each marketplace's format rules are applied to the draft.
- **Review, then publish.** The seller edits and approves, then exports to Shopify, AuctionFlex, or LiveAuctioneers.

![An AI-drafted listing: title, description, item specifics, and suggested starting price generated from product photos](./alistengine-screen-1.png)

## Key engineering decisions

<!-- REVIEW: keep the ones that match your real reasoning and add any trade-offs you made. -->

- **The AI drafts, a person approves.** Generated listings are always reviewed before export, which keeps quality high and mistakes cheap.
- **Marketplace rules outside the prompt.** Formatting and required fields are enforced by a rules engine, so outputs are consistent and a new marketplace doesn't mean rewriting prompts.
- **One export layer per marketplace.** Each integration maps the same listing to that platform's format, so adding a channel is isolated work.

## Results

- Listing creation dropped from hours to minutes.
- Listing quality is more consistent across sellers and channels.
- Sellers and auction teams can list far more items per day.
