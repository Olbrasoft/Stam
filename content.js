// ==UserScript==
// @name         Google Meet Microphone Clicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Clicks the microphone button in Google Meet when Alt+M is pressed
// @author       You
// @match        https://meet.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
      // Debug: vypiš všechny informace o události
      console.log('STAM: keydown event', {
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
        key: e.key,
        code: e.code,
        which: e.which,
        keyCode: e.keyCode
      });
      // Alt + S
      if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        activateMic();
      }
    });

    function activateMic() {
      let micBtn = null;
      // Google Search
      micBtn = document.querySelector('div.XDyW0e[role="button"]');
      if (micBtn) {
        console.log('STAM: Google mikrofonní tlačítko nalezeno');
      }
      // Gemini
      if (!micBtn) {
        micBtn = document.querySelector('mat-icon[data-mat-icon-name="mic"]');
        if (micBtn && micBtn.parentElement) {
          micBtn = micBtn.parentElement;
          console.log('STAM: Gemini mikrofonní tlačítko nalezeno');
        }
      }
      // YouTube
      if (!micBtn) {
        micBtn = document.querySelector('#voice-search-button button[aria-label*="hlas" i], #voice-search-button button');
        if (micBtn) {
          console.log('STAM: YouTube mikrofonní tlačítko (voice-search-button) nalezeno');
        } else {
          // fallback na předchozí logiku
          let ytMicFill = document.querySelector('div.yt-spec-touch-feedback-shape__fill');
          if (ytMicFill) {
            let parent = ytMicFill;
            while (parent && parent !== document.body) {
              if (parent.tagName === 'BUTTON') {
                micBtn = parent;
                console.log('STAM: YouTube mikrofonní tlačítko (button) fallback nalezeno');
                break;
              }
              parent = parent.parentElement;
            }
          }
        }
      }
      // ChatGPT
      if (!micBtn) {
        // First, try to find the "Send dictation" button (mic is active)
        micBtn = document.querySelector('button[aria-label="Odeslat diktování"]');
        if (micBtn) {
          console.log('STAM: ChatGPT "Odeslat diktování" tlačítko nalezeno');
        } else {
          // If not found, try to find the "Start dictation" button (mic is inactive)
          micBtn = document.querySelector('button[aria-label="Tlačítko diktování"]');
          if (micBtn) {
            console.log('STAM: ChatGPT "Tlačítko diktování" tlačítko nalezeno');
          }
        }
      }
      // Perplexity.ai
      if (!micBtn && window.location.hostname.includes('perplexity.ai')) {
        micBtn = document.querySelector('button[aria-label="Dictation"]');
        if (micBtn) {
          console.log('STAM: Perplexity.ai mikrofonní tlačítko nalezeno');
        }
      }
      if (micBtn) {
        micBtn.click();
        const el = document.createElement('div');
        el.textContent = 'STAM: Mikrofon aktivován!';
        el.style.position = 'fixed';
        el.style.top = '10px';
        el.style.right = '10px';
        el.style.background = 'lime';
        el.style.padding = '12px';
        el.style.zIndex = 9999;
        el.style.fontWeight = 'bold';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
      } else {
        console.log('STAM: Mikrofonní tlačítko nenalezeno!');
        const el = document.createElement('div');
        el.textContent = 'STAM: Mikrofonní tlačítko nenalezeno!';
        el.style.position = 'fixed';
        el.style.top = '10px';
        el.style.right = '10px';
        el.style.background = 'red';
        el.style.color = 'white';
        el.style.padding = '12px';
        el.style.zIndex = 9999;
        el.style.fontWeight = 'bold';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
      }
    }

})();