package com.example.quran_app;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.navigation.NavigationView;

public class MainActivity extends AppCompatActivity {
TextView txt;
Button surah_names,parah_names;
    NavigationView navigationView;
    DrawerLayout drawerLayout;
    Toolbar toolbar;
    ActionBarDrawerToggle toggle;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        surah_names=findViewById(R.id.surah_names);
        surah_names.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(MainActivity.this, Surah_List.class);
                startActivity(intent);
            }
        });

        parah_names=findViewById(R.id.parah_names);
        parah_names.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,Parah_List.class);
                startActivity(intent);
            }
        });

        toolbar = findViewById(R.id.toolbar);
        //setSupportActionBar(toolbar);

        navigationView=findViewById(R.id.nav_view);
        drawerLayout=findViewById(R.id.drawer);

        toggle=new ActionBarDrawerToggle(this,drawerLayout,toolbar,R.string.open,R.string.close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {

            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem)
            {
                switch (menuItem.getItemId())
                {
                    case R.id.nav_book :
                        //Toast.makeText(getApplicationContext(),"Retur is Clicked",Toast.LENGTH_LONG).show();
                        Intent intent = new Intent(MainActivity.this, Surah_List.class);
                        startActivity(intent);
                        //drawerLayout.closeDrawer(GravityCompat.START);
                        break;

                    case R.id.nav_return :
                        Intent intent1 = new Intent(MainActivity.this,Parah_List.class);
                        startActivity(intent1);
                        //Toast.makeText(getApplicationContext(),"Retur is Clicked",Toast.LENGTH_LONG).show();
                        //drawerLayout.closeDrawer(GravityCompat.START);
                        break;

//                    case R.id.nav_laptop :
//                        Toast.makeText(getApplicationContext(),"Laptop is clicked",Toast.LENGTH_LONG).show();
//                        drawerLayout.closeDrawer(GravityCompat.START);
//                        break;
//
//                    case R.id.nav_voice :
//                        Toast.makeText(getApplicationContext(),"Voice is clicked",Toast.LENGTH_LONG).show();
//                        drawerLayout.closeDrawer(GravityCompat.START);
//                        break;

                    case R.id.nav_chrome_reader :
                        Intent inte = new Intent(MainActivity.this, SearchSurah.class);
                        startActivity(inte);
//                        Toast.makeText(getApplicationContext(),"Chrome Reader is clicked",Toast.LENGTH_LONG).show();
//                        drawerLayout.closeDrawer(GravityCompat.START);
                        break;
                }

                return true;
            }
        });


    }
    @Override
    public void onBackPressed(){
        if(drawerLayout.isDrawerOpen(GravityCompat.START)){
            drawerLayout.closeDrawer(GravityCompat.START);
            Toast.makeText(getApplicationContext(),"Start",Toast.LENGTH_LONG).show();

        }
        else
        {
            Toast.makeText(getApplicationContext(),"End",Toast.LENGTH_LONG).show();
        }
    }
}