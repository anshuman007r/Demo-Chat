package com.demochat;

import android.app.Application;
import com.demochat.clear.ClearCachePackage;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.storage.ReactNativeFirebaseStoragePackage;
import com.imagepicker.ImagePickerPackage;
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import org.linusu.RNGetRandomValuesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeFirebaseStoragePackage(),
            new ImagePickerPackage(),
            new ReactNativeFirebaseFirestorePackage(),
            new AsyncStoragePackage(),
            new ReactNativeFirebaseAuthPackage(),
            new ReactNativeFirebaseAppPackage(),
            new RNGestureHandlerPackage(),
            new RNScreensPackage(),
            new RNGetRandomValuesPackage(),
	          new ClearCachePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
