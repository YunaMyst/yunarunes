package com.yunarunes.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String HOME = "https://yunarunes.com/";

    private static final String APP_CLEANUP =
        "(function(){"
        + "function injectMenuStyle(){var s=document.getElementById(\'yunarunes-app-menu-v2\');if(!s){s=document.createElement(\'style\');s.id=\'yunarunes-app-menu-v2\';document.head.appendChild(s);}s.textContent=\'@media(max-width:600px){header.top{z-index:1000!important}.nav{min-height:64px!important;padding:8px 10px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;flex-wrap:nowrap!important;gap:8px!important}.brand{order:1!important;margin:0!important;font-size:21px!important}.menu-btn{display:block!important;position:static!important;order:3!important;margin:0 0 0 auto!important;background:#172638!important;border:1px solid #38516a!important;border-radius:12px!important;padding:11px 14px!important;font-size:18px!important;font-weight:900!important;line-height:1!important;box-shadow:0 4px 16px rgba(0,0,0,.25)!important}.nav-links{display:none!important;position:absolute!important;top:calc(100% + 8px)!important;left:10px!important;right:10px!important;width:auto!important;max-height:calc(100vh - 88px)!important;overflow-y:auto!important;padding:14px!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;background:rgba(7,16,29,.98)!important;border:1px solid #33485d!important;border-radius:18px!important;box-shadow:0 18px 50px rgba(0,0,0,.6),0 0 0 1px rgba(53,169,225,.08)!important;backdrop-filter:blur(12px)!important}.nav-toggle:checked~.nav-links{display:grid!important}.nav-links a{display:flex!important;align-items:center!important;justify-content:center!important;min-height:68px!important;padding:12px 10px!important;background:#101b29!important;border:1px solid #2c4053!important;border-radius:14px!important;text-align:center!important;font-size:18px!important;line-height:1.15!important;font-weight:900!important;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;color:#f2f6fa!important}.nav-divider{display:none!important}.nav-advanced{color:#c7b5ff!important}}\';}"
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
        + "injectMenuStyle();clean();"
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
            @Override public boolean shouldOverrideUrlLoading(WebView view, String url) { return false; }
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
