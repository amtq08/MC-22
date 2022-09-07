package com.example.quran_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

public class Surah_Display extends AppCompatActivity {

    ListView ayahs;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_surah__display);
        Intent intent=getIntent();
        int Surah_no=intent.getIntExtra("Surah_no",-1);
        DatabaseAccess databaseAccess=DatabaseAccess.getInstance(getApplicationContext());
        databaseAccess.open();
        ayahs=findViewById(R.id.ayahs);
        List_Adapter_Ayahs listadapter=new List_Adapter_Ayahs(this,databaseAccess.getSurahAyahs(Surah_no));
        ayahs.setAdapter(listadapter);


    }
}