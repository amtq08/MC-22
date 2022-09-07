package com.example.quran_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.util.ArrayList;

public class SearchSurah extends AppCompatActivity {

    public EditText edt1;
    public Button btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_surah);

        edt1 =findViewById(R.id.textView);
        btn =findViewById(R.id.button);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(),Surah_Display.class);
                intent.putExtra("Surah_no",Integer.parseInt(edt1.getText().toString()));
                startActivity(intent);
            }
        });
    }
}