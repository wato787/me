import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { renderSlideHtml, splitSlideHtml } from './slideHtml';

describe('splitSlideHtml', () => {
  test('複数の区切りをすべて処理する', () => {
    assert.deepEqual(splitSlideHtml('<h1>1</h1><hr><h1>2</h1><hr class="break"><h1>3</h1>'), [
      '<h1>1</h1>',
      '<h1>2</h1>',
      '<h1>3</h1>',
    ]);
  });

  test('空のスライドを除外する', () => {
    assert.deepEqual(splitSlideHtml('<hr><p><br></p><hr><h1>Only</h1><hr>'), ['<h1>Only</h1>']);
  });

  test('危険なHTMLを除外する', () => {
    const [slide] = renderSlideHtml('<script>alert(1)</script><img src="/safe.png" onerror="alert(1)">');
    assert.equal(slide, '<span class="mediaWrapAspect"><img src="/safe.png" alt="" loading="lazy" decoding="async" class="mediaImageFill" /></span>');
  });
});
