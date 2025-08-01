#!/usr/bin/env node
// Usage: ./mcp_search.js "coffee"

const storeDomain = process.env.SHOPIFY_DOMAIN ?? 'colourpop.com';
const mcpEndpoint = `https://${storeDomain}/api/mcp`;

const query   = process.argv[2] ?? 'blush';
const context = process.argv[3] ?? ' ';

async function run() {
  const res = await fetch(mcpEndpoint, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({
      jsonrpc: '2.0',
      method : 'tools/call',
      id     : 1,
      params : {
        name: 'search_shop_catalog',
        arguments: { query, context }      
      }
    })
  });

  if (!res.ok) {
    console.error('HTTP error', res.status, await res.text());
    process.exit(1);
  }

  console.log(JSON.stringify(await res.json(), null, 2));
}

run().catch(console.error);
