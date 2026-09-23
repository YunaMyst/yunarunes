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
        + "document.querySelectorAll('.mobile-download').forEach(function(e){e.remove();});"
        + "document.querySelectorAll('.section-title').forEach(function(e){"
        + "var h=e.querySelector('h2');"
        + "if(h && /YunaRunes no celular/i.test(h.textContent)){"
        + "var n=e.nextElementSibling;if(n&&n.classList.contains('mobile-download'))n.remove();"
        + "e.remove();}});"
        + "document.querySelectorAll('a,button').forEach(function(e){"
        + "if(/\\bAPK\\b/i.test((e.textContent||'').trim()))e.remove();});"
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
        settings.setUserAgentString(settings.getUserAgentString() + " YunaRunesApp/1.0");
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
