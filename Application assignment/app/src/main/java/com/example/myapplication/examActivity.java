package com.example.myapplication;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class examActivity extends AppCompatActivity {
    private TextView myScoreView,myQuestion;
    private ImageView myImageview;
    public Button mytruebtn,myfalsebtn;
    private boolean myAns;
    private int myScore=0;
    private int myQuesno = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exam);
        myScoreView = (TextView) findViewById(R.id.Points);
        myImageview = (ImageView) findViewById(R.id.imgview);
        myQuestion = (TextView) findViewById(R.id.question);
        mytruebtn = (Button) findViewById(R.id.trueButton);
        myfalsebtn = (Button) findViewById(R.id.falseButton);
        updateQuestion();

        //logic for true button
        mytruebtn.setOnClickListener(v -> {
            if(myAns)
            {
                myScore++;
                updateScore();
                if(myQuesno==exams.questions.length) {
                    Intent i = new Intent(examActivity.this, result.class);
                    Bundle bundle = new Bundle();
                    bundle.putInt("FinalScore", myScore);
                    i.putExtras(bundle);
                    examActivity.this.finish();
                    startActivity(i);
                }else{
                    updateQuestion();
                }
            }
            else{
                if(myQuesno==exams.questions.length) {
                    Intent i = new Intent(examActivity.this, result.class);
                    Bundle bundle = new Bundle();
                    bundle.putInt("FinalScore", myScore);
                    i.putExtras(bundle);
                    examActivity.this.finish();
                    startActivity(i);
                }else{
                    updateQuestion();
                }
            }
        });

        //logic for false button
        myfalsebtn.setOnClickListener(v -> {
            if(!myAns)
            {
                myScore++;
                updateScore();
                if(myQuesno==exams.questions.length) {
                    Intent i = new Intent(examActivity.this, result.class);
                    Bundle bundle = new Bundle();
                    bundle.putInt("FinalScore", myScore);
                    i.putExtras(bundle);
                    examActivity.this.finish();
                    startActivity(i);
                }else{
                    updateQuestion();
                }
            }else
            {
                if(myQuesno==exams.questions.length) {
                    Intent i = new Intent(examActivity.this, result.class);
                    Bundle bundle = new Bundle();
                    bundle.putInt("FinalScore", myScore);
                    i.putExtras(bundle);
                    examActivity.this.finish();
                    startActivity(i);
                }else{
                    updateQuestion();
                }
            }


        });
    }
    private void updateQuestion() {
        myImageview.setImageResource(exams.images[myQuesno]);
        myQuestion.setText(exams.questions[myQuesno]);
        myAns = exams.answers[myQuesno];
        myQuesno++;
    }
    @SuppressLint("SetTextI18n")
    public void updateScore(){
        myScoreView.setText(""+myScore);




    }
}