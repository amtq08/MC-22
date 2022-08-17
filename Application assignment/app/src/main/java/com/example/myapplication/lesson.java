package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ListView;

public class lesson extends AppCompatActivity {
    String[] mylist = {"Apple","Ball","Car","Duck","Eggs","Fish","Goat","House","IceCream","Jam","Kite","Lamp","Mango","Nest","Orange","Pencil","Queen","Ring","Ship","Tree","Umbrella","Vase","Watermelon","Xylophone","Yacht","Zebra"};
    int[] myImages = {R.drawable.apple,R.drawable.balll,R.drawable.car,R.drawable.duck,R.drawable.eggs,R.drawable.fish,R.drawable.goat,R.drawable.house,R.drawable.icecream,R.drawable.jam,R.drawable.kite,R.drawable.lamp,R.drawable.mango,R.drawable.nest,R.drawable.orange,R.drawable.pencil,R.drawable.queen,R.drawable.ring,R.drawable.ship,R.drawable.tree,R.drawable.umbrella,R.drawable.vase,R.drawable.watermelon,R.drawable.xlophon,R.drawable.yatch,R.drawable.zebra};
    ListView listview;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lesson);
        listview=(ListView) findViewById(R.id.customListView);
        LessonAdapter lessonadapter = new LessonAdapter(getApplicationContext(),mylist,myImages);
        listview.setAdapter(lessonadapter);
    }
}