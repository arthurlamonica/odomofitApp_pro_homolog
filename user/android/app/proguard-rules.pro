# ProGuard / R8 rules for O Domo FIT Mobile App

# Keep Capacitor Core and Plugins
-keep public class com.getcapacitor.** { *; }
-keep public class * extends com.getcapacitor.Plugin
-keep public class * extends com.getcapacitor.BridgeActivity
-keep public class * extends com.getcapacitor.BridgeFragment

# Keep WebKit and Javascript Interfaces
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep Cordova plugins if any
-keep public class org.apache.cordova.** { *; }

# Keep models and reflection-accessed classes
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod

# Keep splash screen and AndroidX
-keep class androidx.core.splashscreen.** { *; }
