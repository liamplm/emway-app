package com.emway;

import com.facebook.react.ReactActivity;
// import org.devio.rn.splashscreen.SplashScreen; // import this

import android.content.Context;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

import static android.os.SystemClock.sleep;


public class MainActivity extends ReactActivity {
    Context mContext;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        // SplashScreen.show(this); // here
       // mContext = this;
        //setContentView(R.layout.launch_screen);

       // AnimateBell();
        super.onCreate(savedInstanceState);
        // Thread time = new Thread() {
        //     public void run() {

        //         try {
        //             sleep(5000);
        //         } catch (InterruptedException e) {
        //             e.printStackTrace();
        //         } finally {
        //             finish();

        //         }
        //     }
        // };
        // time.start();
    }


    public void AnimateBell() {
        Animation shake = AnimationUtils.loadAnimation(mContext, R.anim.shakeanimation);
        ImageView imgBell = (ImageView) findViewById(R.id.imgBell);
        // imgBell.setImageResource(R.mipmap.ic_notifications_active_white_48dp);
        imgBell.setAnimation(shake);
        //sleep(5000);
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "EMway";
    }
}
