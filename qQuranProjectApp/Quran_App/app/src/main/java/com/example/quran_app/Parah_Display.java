package com.example.quran_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ListView;
import android.widget.TextView;

public class Parah_Display extends AppCompatActivity {

    ListView ayahs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_parah_display);

        ayahs = findViewById(R.id.ayahs_parah);

        Intent intent=getIntent();
        int parah_no=intent.getIntExtra("parah_no",-1);
        DatabaseAccess databaseAccess=DatabaseAccess.getInstance(getApplicationContext());
        databaseAccess.open();
        //ayahs=findViewById(R.id.ayahs);
        List_Adapter_Ayahs listadapter=new List_Adapter_Ayahs(this,databaseAccess.getParahAyahs(parah_no));
        ayahs.setAdapter(listadapter);
    }
}