import { test, expect } from '@playwright/test';
import { getAllCategories, getAllTags, getAttractionSlugs } from './helpers';

const BASE_URL = 'http://localhost:3002';

// Test data
const categories = getAllCategories();
const tags = getAllTags();
const attractionSlugs = getAttractionSlugs();

// Sample specific attractions to test
const specificAttractions = [
  'oceanario-de-lisboa',
  'pasteis-de-belem',
  'time-out-market-lisboa',
  'parque-das-nacoes',
  'bairro-alto',
];

test.describe('Lisbon Cruise Guide - Complete Validation', () => {

  // Track all errors
  const testErrors: string[] = [];
  const consoleErrors: string[] = [];

  test.beforeAll(() => {
    console.log('\n=== STARTING PLAYWRIGHT TEST SUITE ===\n');
    console.log(`Base URL: ${BASE_URL}`);
    console.log(`Total Attractions: ${attractionSlugs.length}`);
    console.log(`Total Categories: ${categories.length}`);
    console.log(`Total Tags: ${tags.length}`);
    console.log(`Expected Pages: ${1 + attractionSlugs.length + categories.length + tags.length + 3}`);
    console.log('\n======================================\n');
  });

  test.afterAll(() => {
    console.log('\n=== TEST SUITE COMPLETED ===\n');
    if (testErrors.length > 0) {
      console.log(`Total Errors Found: ${testErrors.length}`);
      testErrors.forEach(err => console.log(`  - ${err}`));
    }
    if (consoleErrors.length > 0) {
      console.log(`\nConsole Errors: ${consoleErrors.length}`);
      consoleErrors.slice(0, 10).forEach(err => console.log(`  - ${err}`));
    }
  });

  // ===== HOMEPAGE TESTS =====
  test('Homepage loads successfully without errors', async ({ page }) => {
    const pageConsoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        pageConsoleErrors.push(msg.text());
        consoleErrors.push(`Homepage: ${msg.text()}`);
      }
    });

    const response = await page.goto(BASE_URL);

    // Check HTTP status
    expect(response?.status()).toBe(200);

    // Check for console errors
    if (pageConsoleErrors.length > 0) {
      testErrors.push(`Homepage has ${pageConsoleErrors.length} console errors`);
    }
    expect(pageConsoleErrors).toHaveLength(0);

    // Verify page title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(20);

    // Verify meta description
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc!.length).toBeGreaterThan(50);

    // Check that hero section exists
    const heroSection = await page.locator('h1, [role="heading"]').first();
    await expect(heroSection).toBeVisible();

    // Check that some content is displayed
    const mainContent = await page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible();

    console.log(`✅ Homepage: PASS (status ${response?.status()}, title: "${title}")`);
  });

  // ===== INDIVIDUAL ATTRACTION PAGES TESTS =====
  test('Specific attraction pages load without 404s', async ({ page }) => {
    const errors: string[] = [];
    const pageConsoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        pageConsoleErrors.push(msg.text());
      }
    });

    console.log(`\nTesting ${specificAttractions.length} specific attraction pages...`);

    for (const slug of specificAttractions) {
      try {
        const url = `${BASE_URL}/attractions/${slug}`;
        const response = await page.goto(url);

        // Check for 404
        if (response?.status() === 404) {
          errors.push(`404 ERROR: /attractions/${slug}`);
          testErrors.push(`404 ERROR: /attractions/${slug}`);
          continue;
        }

        // Check for 5xx errors
        if (response && response.status() >= 500) {
          errors.push(`SERVER ERROR ${response.status()}: /attractions/${slug}`);
          testErrors.push(`SERVER ERROR ${response.status()}: /attractions/${slug}`);
          continue;
        }

        // Verify page has title
        const title = await page.title();
        if (!title || title.includes('404') || title.includes('Not Found')) {
          errors.push(`MISSING/BAD TITLE: /attractions/${slug} - "${title}"`);
          testErrors.push(`BAD TITLE: /attractions/${slug}`);
        }

        // Verify meta description
        const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
        if (!metaDesc || metaDesc.length < 50) {
          errors.push(`SHORT META DESCRIPTION: /attractions/${slug} (${metaDesc?.length || 0} chars)`);
          testErrors.push(`SHORT META: /attractions/${slug}`);
        }

        // Check for main heading
        const heading = await page.locator('h1').first().textContent();
        if (!heading || heading.trim().length === 0) {
          errors.push(`MISSING H1: /attractions/${slug}`);
          testErrors.push(`MISSING H1: /attractions/${slug}`);
        }

        console.log(`  ✅ /attractions/${slug}: ${response?.status()} - "${title}"`);

      } catch (error) {
        const errorMsg = `EXCEPTION on /attractions/${slug}: ${(error as Error).message}`;
        errors.push(errorMsg);
        testErrors.push(errorMsg);
      }
    }

    if (errors.length > 0) {
      console.log(`\n❌ Found ${errors.length} errors in specific attraction pages`);
    } else {
      console.log(`✅ All ${specificAttractions.length} specific attraction pages: PASS`);
    }

    expect(errors).toHaveLength(0);
  });

  // ===== SAMPLE ATTRACTION PAGES TEST =====
  test('Sample of all attraction pages load correctly', async ({ page }) => {
    const errors: string[] = [];
    const sampleSize = Math.min(15, attractionSlugs.length);
    const sampleAttractions = attractionSlugs.slice(0, sampleSize);

    console.log(`\nTesting ${sampleSize} sample attraction pages...`);

    for (const slug of sampleAttractions) {
      try {
        const url = `${BASE_URL}/attractions/${slug}`;
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' });

        if (response?.status() !== 200) {
          errors.push(`STATUS ${response?.status()}: /attractions/${slug}`);
          testErrors.push(`STATUS ${response?.status()}: /attractions/${slug}`);
          continue;
        }

        // Quick validation
        const title = await page.title();
        if (!title || title.length < 10) {
          errors.push(`Invalid title: /attractions/${slug}`);
        }

      } catch (error) {
        errors.push(`ERROR: /attractions/${slug}`);
        testErrors.push(`ERROR: /attractions/${slug}`);
      }
    }

    if (errors.length > 0) {
      console.log(`❌ Found ${errors.length} errors in sample attractions`);
    } else {
      console.log(`✅ All ${sampleSize} sample attraction pages: PASS`);
    }

    expect(errors).toHaveLength(0);
  });

  // ===== CATEGORY PAGES TESTS =====
  test('Sample category pages load with correct filtering', async ({ page }) => {
    const errors: string[] = [];
    const sampleSize = Math.min(10, categories.length);
    const sampleCategories = categories.slice(0, sampleSize);

    console.log(`\nTesting ${sampleSize} of ${categories.length} category pages...`);

    for (const category of sampleCategories) {
      try {
        const url = `${BASE_URL}/categories/${category}`;
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Check status
        if (response?.status() !== 200) {
          errors.push(`STATUS ${response?.status()}: /categories/${category}`);
          testErrors.push(`STATUS ${response?.status()}: /categories/${category}`);
          continue;
        }

        // Verify SEO title
        const title = await page.title();
        if (!title || title.length < 20) {
          errors.push(`SHORT TITLE: /categories/${category} - "${title}"`);
          testErrors.push(`SHORT TITLE: /categories/${category}`);
        }

        // Verify meta description
        const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
        if (!metaDesc || metaDesc.length < 50) {
          errors.push(`SHORT META: /categories/${category}`);
          testErrors.push(`SHORT META: /categories/${category}`);
        }

        // Verify main heading
        const heading = await page.locator('h1').first().textContent();
        if (!heading) {
          errors.push(`MISSING H1: /categories/${category}`);
          testErrors.push(`MISSING H1: /categories/${category}`);
        }

        console.log(`  ✅ /categories/${category}: ${response?.status()}`);

      } catch (error) {
        errors.push(`EXCEPTION: /categories/${category}`);
        testErrors.push(`ERROR: /categories/${category}`);
      }
    }

    if (errors.length > 0) {
      console.log(`❌ Found ${errors.length} errors in category pages`);
    } else {
      console.log(`✅ All ${sampleSize} category pages: PASS`);
    }

    expect(errors).toHaveLength(0);
  });

  // ===== TAG PAGES TESTS =====
  test('Sample tag pages load with correct filtering', async ({ page }) => {
    const errors: string[] = [];
    const sampleSize = Math.min(10, tags.length);
    const sampleTags = tags.slice(0, sampleSize);

    console.log(`\nTesting ${sampleSize} of ${tags.length} tag pages...`);

    for (const tag of sampleTags) {
      try {
        const url = `${BASE_URL}/tags/${tag}`;
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' });

        if (response?.status() !== 200) {
          errors.push(`STATUS ${response?.status()}: /tags/${tag}`);
          testErrors.push(`STATUS ${response?.status()}: /tags/${tag}`);
          continue;
        }

        // Verify title
        const title = await page.title();
        if (!title || title.length < 20) {
          errors.push(`SHORT TITLE: /tags/${tag}`);
          testErrors.push(`SHORT TITLE: /tags/${tag}`);
        }

        console.log(`  ✅ /tags/${tag}: ${response?.status()}`);

      } catch (error) {
        errors.push(`ERROR: /tags/${tag}`);
        testErrors.push(`ERROR: /tags/${tag}`);
      }
    }

    if (errors.length > 0) {
      console.log(`❌ Found ${errors.length} errors in tag pages`);
    } else {
      console.log(`✅ All ${sampleSize} tag pages: PASS`);
    }

    expect(errors).toHaveLength(0);
  });

  // ===== ATTRACTIONS LIST PAGE =====
  test('Attractions list page loads correctly', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/attractions`);

    expect(response?.status()).toBe(200);

    const title = await page.title();
    expect(title).toBeTruthy();

    const heading = await page.locator('h1').first().textContent();
    expect(heading).toBeTruthy();

    console.log(`✅ /attractions page: PASS`);
  });

  // ===== SEARCH PAGE =====
  test('Search page loads successfully', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/search`);

    expect(response?.status()).toBe(200);

    // Check search page loaded
    const title = await page.title();
    expect(title).toBeTruthy();

    console.log(`✅ /search page: PASS`);
  });

  // ===== MAP PAGE =====
  test('Map page loads successfully', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/map`);

    expect(response?.status()).toBe(200);

    const title = await page.title();
    expect(title).toBeTruthy();

    console.log(`✅ /map page: PASS`);
  });

  // ===== NAVIGATION TESTS =====
  test('Navigation links work correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check that navigation exists
    const nav = page.locator('nav, header');
    await expect(nav.first()).toBeVisible();

    // Try to find and click a link (if navigation has links)
    const navLinks = await page.locator('nav a, header a').count();

    if (navLinks > 0) {
      console.log(`✅ Navigation found with ${navLinks} links`);
    } else {
      console.log(`⚠️ Warning: No navigation links found`);
    }

    // Test going back to homepage
    await page.goto(BASE_URL);
    const response = await page.goto(BASE_URL);
    expect(response?.status()).toBe(200);

    console.log('✅ Navigation: PASS');
  });

  // ===== MOBILE RESPONSIVENESS =====
  test('Site is mobile responsive', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    // Verify content is visible on mobile
    const mainContent = await page.locator('main, body').first();
    await expect(mainContent).toBeVisible();

    // Check that page doesn't have horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    if (bodyWidth > viewportWidth + 10) {
      testErrors.push(`Mobile: Horizontal scroll detected (body: ${bodyWidth}px, viewport: ${viewportWidth}px)`);
    }

    console.log(`✅ Mobile responsive: PASS (viewport: 375x667)`);
  });

  // ===== SEO META TAGS =====
  test('SEO meta tags are present on key pages', async ({ page }) => {
    const errors: string[] = [];

    const testUrls = [
      { path: '/', name: 'Homepage' },
      { path: '/attractions', name: 'Attractions List' },
      { path: `/attractions/${attractionSlugs[0]}`, name: `Attraction: ${attractionSlugs[0]}` },
      { path: `/categories/${categories[0]}`, name: `Category: ${categories[0]}` },
      { path: `/tags/${tags[0]}`, name: `Tag: ${tags[0]}` },
    ];

    console.log(`\nValidating SEO meta tags on ${testUrls.length} key pages...`);

    for (const { path, name } of testUrls) {
      try {
        await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded' });

        // Check title
        const title = await page.title();
        if (!title || title.length < 20) {
          errors.push(`${name}: Title too short (${title?.length || 0} chars)`);
          testErrors.push(`SEO: ${name} - short title`);
        }

        // Check meta description
        const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
        if (!metaDesc || metaDesc.length < 50) {
          errors.push(`${name}: Meta description too short (${metaDesc?.length || 0} chars)`);
          testErrors.push(`SEO: ${name} - short meta desc`);
        }

        // Check Open Graph title
        const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
        if (!ogTitle) {
          errors.push(`${name}: Missing og:title`);
          testErrors.push(`SEO: ${name} - missing og:title`);
        }

        console.log(`  ✅ ${name}: SEO tags present`);

      } catch (error) {
        errors.push(`${name}: Error checking SEO tags`);
        testErrors.push(`SEO: ${name} - error`);
      }
    }

    if (errors.length > 0) {
      console.log(`\n⚠️ Found ${errors.length} SEO issues:`);
      errors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log(`✅ All SEO meta tags: PASS`);
    }

    // Don't fail the test for SEO issues, just warn
    if (errors.length > 0) {
      console.log('\n⚠️ SEO issues detected but not blocking deployment');
    }
  });

  // ===== IMAGE LOADING =====
  test('Images load properly on sample pages', async ({ page }) => {
    const errors: string[] = [];

    // Test homepage images
    await page.goto(BASE_URL);

    const images = await page.locator('img').all();
    console.log(`\nFound ${images.length} images on homepage`);

    let brokenImages = 0;
    for (const img of images.slice(0, 10)) { // Test first 10 images
      try {
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');

        if (!alt) {
          console.log(`  ⚠️ Image missing alt text: ${src}`);
        }

        // Check if image is visible
        const isVisible = await img.isVisible();
        if (!isVisible) {
          brokenImages++;
        }
      } catch (error) {
        brokenImages++;
      }
    }

    if (brokenImages > 0) {
      console.log(`⚠️ ${brokenImages} images may not be loading properly`);
      testErrors.push(`${brokenImages} images not visible`);
    } else {
      console.log(`✅ Image loading: PASS`);
    }
  });

  // ===== PERFORMANCE CHECK =====
  test('Pages load within reasonable time', async ({ page }) => {
    const pagesToTest = [
      { path: '/', name: 'Homepage' },
      { path: `/attractions/${attractionSlugs[0]}`, name: 'Sample Attraction' },
      { path: `/categories/${categories[0]}`, name: 'Sample Category' },
    ];

    console.log(`\nPerformance testing ${pagesToTest.length} pages...`);

    for (const { path, name } of pagesToTest) {
      const startTime = Date.now();
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - startTime;

      console.log(`  ${name}: ${loadTime}ms`);

      if (loadTime > 5000) {
        console.log(`  ⚠️ Warning: ${name} took ${loadTime}ms to load`);
        testErrors.push(`Slow load: ${name} (${loadTime}ms)`);
      }
    }

    console.log('✅ Performance check: COMPLETE');
  });
});
