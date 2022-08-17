package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button one = findViewById(R.id.button1);
        one.setOnClickListener(v -> {
            Intent intent=new Intent(MainActivity.this,lesson.class);
            startActivity(intent);
        });
        Button two = findViewById(R.id.button2);
        two.setOnClickListener(v -> {
            Intent intent=new Intent(MainActivity.this,examActivity.class);
            startActivity(intent);
        });

    }
}