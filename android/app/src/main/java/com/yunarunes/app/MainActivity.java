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
        + "if(h && /YunaRunes no celular|YunaRunes on mobile/i.test(h.textContent)){"
        + "var n=e.nextElementSibling;if(n)n.remove();e.remove();}});"
        + "document.querySelectorAll('a,button,label,[role=\\\"button\\\"]').forEach(function(e){"
        + "var t=(e.textContent||'').trim();var href=(e.getAttribute('href')||'').toLowerCase();"
        + "if(/\\\\bAPK\\\\b/i.test(t)||href.indexOf('.apk')!==-1)e.remove();"
        + "});"
        + "var nav=document.querySelector('header.top>.nav');"
        + "var brand=document.querySelector('header.top .brand');"
        + "var menu=document.querySelector('header.top .menu-btn');"
        + "var langs=document.querySelector('header.top .yuna-controls');"
        + "if(nav&&brand&&menu&&langs){"
        + "nav.style.setProperty('display','flex','important');"
        + "nav.style.setProperty('flex-direction','row','important');"
        + "nav.style.setProperty('align-items','center','important');"
        + "nav.style.setProperty('justify-content','flex-start','important');"
        + "nav.style.setProperty('flex-wrap','nowrap','important');"
        + "nav.style.setProperty('width','100%','important');"
        + "nav.style.setProperty('min-height','64px','important');"+ "nav.style.setProperty('box-sizing','border-box','important');"+ "nav.style.setProperty('padding','22px 8px 12px','important');"
        + "nav.style.setProperty('gap','8px','important');"
        + "brand.style.setProperty('display','block','important');"
        + "brand.style.setProperty('position','static','important');"
        + "brand.style.setProperty('order','1','important');"
        + "brand.style.setProperty('margin','0','important');"+ "brand.style.setProperty('font-size','18px','important');"+ "brand.style.setProperty('line-height','1','important');"+ "brand.style.setProperty('white-space','nowrap','important');"
        + "menu.style.setProperty('display','block','important');"
        + "menu.style.setProperty('position','static','important');"
        + "menu.style.setProperty('order','2','important');"
        + "menu.style.setProperty('margin','0','important');"
        + "menu.style.setProperty('min-height','42px','important');"+ "menu.style.setProperty('box-sizing','border-box','important');"
        + "menu.style.setProperty('padding','8px 10px','important');"
        + "langs.style.setProperty('display','flex','important');"
        + "langs.style.setProperty('align-items','center','important');"
        + "langs.style.setProperty('position','static','important');"
        + "langs.style.setProperty('order','3','important');"
        + "langs.style.setProperty('margin','0 0 0 auto','important');"
        + "langs.style.setProperty('width','auto','important');"+ "langs.style.setProperty('padding','0','important');"+ "langs.style.setProperty('min-height','0','important');"+ "langs.style.setProperty('gap','5px','important');"
        + "langs.querySelectorAll('button').forEach(function(b){"
        + "b.style.setProperty('height','34px','important');"
        + "b.style.setProperty('min-width','58px','important');"+ "b.style.setProperty('width','auto','important');"+ "b.style.setProperty('box-sizing','border-box','important');"+ "b.style.setProperty('padding','0 6px','important');"+ "b.style.setProperty('font-size','9px','important');"
        + "b.style.setProperty('margin','0','important');"
        + "});"
        + "}"
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
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
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
