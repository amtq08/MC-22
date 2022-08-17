package com.example.myapplication;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class result extends AppCompatActivity {
    TextView myGrade,myFinalScore;
    Button myRetry;

    @SuppressLint("SetTextI18n")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);
        myGrade=(TextView) findViewById(R.id.grade);
        myFinalScore=(TextView) findViewById(R.id.outof);
        myRetry=(Button) findViewById(R.id.retry);

        Bundle bundle= getIntent().getExtras();
        int nscore = bundle.getInt("finalScore");
        myFinalScore.setText("you score"+nscore+"out of"+exams.questions.length);
        if(nscore==9)
        {
            myGrade.setText("Outstanding");
        }else if(nscore==8){
            myGrade.setText("Good Work");
        }else if(nscore==7){
            myGrade.setText("Good effort");
        }else{
            myGrade.setText("Try hard next time");
        }
        myRetry.setOnClickListener(v -> startActivity(new Intent(result.this,examActivity.class)));


    }
}