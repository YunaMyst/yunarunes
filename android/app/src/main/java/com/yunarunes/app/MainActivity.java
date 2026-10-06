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
        "(function(){\n"
        + "  function apply(){\n"
        + "    var top=document.querySelector('header.top');\n"
        + "    var nav=top && top.querySelector(':scope > .nav');\n"
        + "    var brand=top && top.querySelector(':scope > .nav > .header-brand');\n"
        + "    var menuWrap=top && top.querySelector(':scope > .nav > .header-menu');\n"
        + "    var menu=menuWrap && menuWrap.querySelector('.menu-btn');\n"
        + "    var controls=top && top.querySelector(':scope > .nav > .header-controls');\n"
        + "    var langs=controls && controls.querySelector('.yuna-controls');\n"
        + "    if(!nav||!menuWrap||!menu||!controls||!langs)return;\n"
        + "\n"
        + "    top.style.setProperty('width','100%','important');\n"
        + "    top.style.setProperty('overflow','visible','important');\n    document.documentElement.style.setProperty('width','100%','important');\n    document.body.style.setProperty('width','100%','important');\n    document.body.style.setProperty('min-width','0','important');\n    document.body.style.setProperty('margin','0','important');\n    document.body.style.setProperty('padding','0','important');\n    document.body.style.setProperty('overflow-x','hidden','important');\n    top.style.setProperty('position','relative','important');\n    top.style.setProperty('left','0','important');\n    top.style.setProperty('right','auto','important');\n    top.style.setProperty('transform','none','important');\n    top.style.setProperty('margin-left','0','important');\n    top.style.setProperty('margin-right','0','important');\n    top.style.setProperty('box-sizing','border-box','important');\n"
        + "\n"
        + "    nav.style.setProperty('display','flex','important');\n"
        + "    nav.style.setProperty('flex-direction','row','important');\n"
        + "    nav.style.setProperty('align-items','center','important');\n"
        + "    nav.style.setProperty('justify-content','flex-start','important');\n"
        + "    nav.style.setProperty('flex-wrap','nowrap','important');\n"
        + "    nav.style.setProperty('width','100%','important');\n"
        + "    nav.style.setProperty('max-width','none','important');\n"
        + "    nav.style.setProperty('min-height','58px','important');\n"
        + "    nav.style.setProperty('box-sizing','border-box','important');\n"
        + "    nav.style.setProperty('padding','8px 8px','important');\n"
        + "    nav.style.setProperty('gap','8px','important');\n"
        + "    nav.style.setProperty('margin','0','important');\n"
        + "\n"
        + "    // APP: keep YunaRunes visible and prevent the left text from being clipped.\n"
+ "    if(brand){\n"
+ "      brand.style.setProperty('display','flex','important');\n"
+ "      brand.style.setProperty('flex','0 0 auto','important');\n"
+ "      brand.style.setProperty('width','auto','important');\n"
+ "      brand.style.setProperty('min-width','max-content','important');\n"
+ "      brand.style.setProperty('max-width','none','important');\n"
+ "      brand.style.setProperty('overflow','visible','important');\n"
+ "      brand.style.setProperty('white-space','nowrap','important');\n"
+ "      brand.style.setProperty('flex-shrink','0','important');\n"
+ "      brand.style.setProperty('visibility','visible','important');\n"
+ "      brand.style.setProperty('margin','0','important');\n"
+ "      brand.style.setProperty('padding','0','important');\n"
+ "    }\n"
+ "\n"
        + "    menuWrap.style.setProperty('display','block','important');\n"
        + "    menuWrap.style.setProperty('position','static','important');\n"
        + "    menuWrap.style.setProperty('flex','0 0 auto','important');\n"
        + "    menuWrap.style.setProperty('width','auto','important');\n"
        + "    menuWrap.style.setProperty('min-width','0','important');\n"
        + "    menuWrap.style.setProperty('margin','0','important');\n"
        + "    menuWrap.style.setProperty('padding','0','important');\n"
        + "    menuWrap.style.setProperty('overflow','visible','important');\n"
        + "    menuWrap.style.setProperty('order','1','important');\n"
        + "\n"
        + "    menu.style.setProperty('display','inline-flex','important');\n"
        + "    menu.style.setProperty('position','static','important');\n"
        + "    menu.style.setProperty('margin','0','important');\n"
        + "    menu.style.setProperty('padding','10px 13px','important');\n"
        + "    menu.style.setProperty('min-height','42px','important');\n"
        + "    menu.style.setProperty('height','42px','important');\n"
        + "    menu.style.setProperty('box-sizing','border-box','important');\n"
        + "    menu.style.setProperty('font-size','17px','important');\n"
        + "    menu.style.setProperty('line-height','1','important');\n"
        + "    menu.style.setProperty('white-space','nowrap','important');\n"
        + "    menu.style.setProperty('flex','0 0 auto','important');\n"
        + "    // APP: lower Menu for easier tapping.\n"
        + "    menu.style.setProperty('transform','translateY(8px)','important');\n"
        + "\n"
        + "    controls.style.setProperty('display','flex','important');\n"
        + "    controls.style.setProperty('align-items','center','important');\n"
        + "    controls.style.setProperty('justify-content','flex-end','important');\n"
        + "    controls.style.setProperty('position','static','important');\n"
        + "    controls.style.setProperty('flex','0 0 auto','important');\n"
        + "    controls.style.setProperty('width','auto','important');\n"
        + "    controls.style.setProperty('min-width','0','important');\n"
        + "    controls.style.setProperty('max-width','100%','important');\n"
        + "    controls.style.setProperty('height','auto','important');\n"
        + "    controls.style.setProperty('margin','0 0 0 auto','important');\n"
        + "    controls.style.setProperty('padding','0','important');\n"
        + "    controls.style.setProperty('order','2','important');\n"
        + "    // APP: lower PT/BR, ENG and Donate together.\n"
        + "    controls.style.setProperty('transform','translateY(8px)','important');\n"
        + "    controls.style.setProperty('overflow','visible','important');\n"
        + "\n"
        + "    langs.style.setProperty('display','flex','important');\n"
        + "    langs.style.setProperty('align-items','center','important');\n"
        + "    langs.style.setProperty('justify-content','flex-end','important');\n"
        + "    langs.style.setProperty('flex-wrap','nowrap','important');\n"
        + "    langs.style.setProperty('gap','4px','important');\n"
        + "    langs.style.setProperty('width','auto','important');\n"
        + "    langs.style.setProperty('min-width','0','important');\n"
        + "    langs.style.setProperty('max-width','100%','important');\n"
        + "    langs.style.setProperty('height','auto','important');\n"
        + "    langs.style.setProperty('margin','0','important');\n"
        + "    langs.style.setProperty('padding','0','important');\n"
        + "    langs.querySelectorAll('button,.donate-link').forEach(function(b){\n"
        + "      b.style.setProperty('display','inline-flex','important');\n"
        + "      b.style.setProperty('align-items','center','important');\n"
        + "      b.style.setProperty('justify-content','center','important');\n"
        + "      b.style.setProperty('flex','0 1 auto','important');\n"
        + "      b.style.setProperty('min-width','0','important');\n"
        + "      b.style.setProperty('width','auto','important');\n"
        + "      b.style.setProperty('max-width','none','important');\n"
        + "      b.style.setProperty('height','38px','important');\n"
        + "      b.style.setProperty('box-sizing','border-box','important');\n"
        + "      b.style.setProperty('padding','0 8px','important');\n"
        + "      b.style.setProperty('margin','0','important');\n"
        + "      b.style.setProperty('font-size','11px','important');\n"
        + "      b.style.setProperty('line-height','1','important');\n"
        + "      b.style.setProperty('white-space','nowrap','important');\n"
        + "    });\n"
        + "\n"
        + "    var links=menuWrap.querySelector('.nav-links');\n"
        + "    if(links){\n"
        + "      links.style.setProperty('display','none','important');\n"
        + "      links.style.setProperty('position','absolute','important');\n"
        + "      links.style.setProperty('left','8px','important');\n"
        + "      links.style.setProperty('right','8px','important');\n"
        + "      links.style.setProperty('width','auto','important');\n"
        + "      links.style.setProperty('max-width','none','important');\n"
        + "      links.style.setProperty('z-index','10004','important');\n"
        + "    }\n"
        + "\n"
        + "    document.documentElement.style.setProperty('overflow-x','hidden','important');\n"
        + "    document.body.style.setProperty('overflow-x','hidden','important');\n"
        + "  }\n"
        + "\n"
        + "  function clean(){\n"
        + "    document.querySelectorAll('.mobile-download').forEach(function(e){e.remove();});\n"
        + "    document.querySelectorAll('.section-title').forEach(function(e){\n"
        + "      var h=e.querySelector('h2');\n"
        + "      if(h && /YunaRunes no celular|YunaRunes on mobile/i.test(h.textContent)){\n"
        + "        var n=e.nextElementSibling;if(n)n.remove();e.remove();\n"
        + "      }\n"
        + "    });\n"
        + "    document.querySelectorAll('a,button,label,[role=\"button\"]').forEach(function(e){\n"
        + "      var t=(e.textContent||'').trim();\n"
        + "      var href=(e.getAttribute('href')||'').toLowerCase();\n"
        + "      if(/\\bAPK\\b/i.test(t)||href.indexOf('.apk')!==-1)e.remove();\n"
        + "    });\n"
        + "    apply();\n"
        + "  }\n"
        + "\n"
        + "  apply();\n"
        + "  clean();\n"
        + "  new MutationObserver(function(){apply();}).observe(document.documentElement,{childList:true,subtree:true});\n"
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
        settings.setLoadWithOverviewMode(false);
        settings.setUseWideViewPort(false);
        webView.setInitialScale(100);
        settings.setTextZoom(100);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        settings.setUserAgentString(settings.getUserAgentString() + " YunaRunesApp/1.2");
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, String url) { return false; }
            @Override public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                view.evaluateJavascript("var m=document.querySelector('meta[name=\\\"viewport\\\"]');if(!m){m=document.createElement('meta');m.name='viewport';document.head.appendChild(m);}m.setAttribute('content','width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no');" + APP_CLEANUP, null);
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
