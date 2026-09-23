package com.yunarunes.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String HOME = "https://yunamyst.github.io/yunarunes/";

    private static final String APP_CLEANUP =
        "(function(){"
        + "function clean(){"
        // Remove the mobile-download section and its title inside the APK.
        + "document.querySelectorAll('.mobile-download').forEach(function(e){e.remove();});"
        + "document.querySelectorAll('.section-title').forEach(function(e){"
        + "var h=e.querySelector('h2');"
        + "if(h && /YunaRunes no celular|YunaRunes on mobile/i.test(h.textContent)){"
        + "var n=e.nextElementSibling;if(n)n.remove();e.remove();}});"
        // Remove every APK/download control from the app, including dynamically-created controls.
        + "document.querySelectorAll('a,button,label,[role=\"button\"]').forEach(function(e){"
        + "var t=(e.textContent||'').trim();var href=(e.getAttribute('href')||'').toLowerCase();"
        + "if(/\\bAPK\\b/i.test(t)||href.indexOf('.apk')!==-1||href.indexOf('download')!==-1&&/apk/i.test(href))e.remove();"
        + "});"
        // Give the mobile header more breathing room so Menu and language buttons are easy to tap.
        + "var top=document.querySelector('header.top');"
        + "var nav=top&&top.querySelector('.nav');"
        + "if(top&&nav){top.style.paddingTop='10px';top.style.paddingBottom='8px';"
        + "nav.style.paddingTop='18px';nav.style.paddingBottom='14px';nav.style.gap='12px';}"
        + "var brand=document.querySelector('header.top .brand');
        if(brand){brand.style.marginLeft='0';brand.style.marginRight='auto';brand.style.justifySelf='start';brand.style.textAlign='left';}
        var menu=document.querySelector('.menu-btn');"
        + "if(menu){menu.style.marginTop='12px';menu.style.minHeight='44px';menu.style.padding='10px 13px';}"
        + "document.querySelectorAll('.yuna-controls').forEach(function(e){"
        + "e.style.marginTop='14px';e.style.marginBottom='4px';e.style.gap='8px';e.style.minHeight='40px';"
        + "});"
        + "document.querySelectorAll('.yuna-controls a,.yuna-controls button').forEach(function(e){"
        + "e.style.minHeight='40px';e.style.padding='0 11px';}"
        + "}"
        + "clean();"
        + "new MutationObserver(clean).observe(document.documentElement,{childList:true,subtree:true});"
        + "})();";

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setUserAgentString(settings.getUserAgentString() + " YunaRunesApp/1.1");
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) { return false; }
            @Override public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                view.evaluateJavascript(APP_CLEANUP, null);
            }
        });

        setContentView(webView);
        if (savedInstanceState == null) webView.loadUrl(HOME);
        else webView.restoreState(savedInstanceState);
    }

    @Override protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack(); else super.onBackPressed();
    }
}
