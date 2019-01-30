package com.pytlasmobile;

import com.reactnativenavigation.NavigationActivity;
import android.view.View;
import android.widget.LinearLayout;
import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;

public class MainActivity extends NavigationActivity {

  @Override
  protected void addDefaultSplashLayout() {
    // LinearLayout splash = new LinearLayout(this);
    // Drawable launch_screen_bitmap = ContextCompat.getDrawable(getApplicationContext(),R.drawable.launch_screen_bitmap);
    // setContentView(splash);
    View view = new View(this);
    view.setBackgroundResource(R.drawable.launch_screen_bitmap);

    setContentView(view);
  }

}
