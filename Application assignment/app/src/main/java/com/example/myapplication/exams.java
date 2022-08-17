package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

public class exams extends AppCompatActivity {

    public static String[] questions = new String[]{
            "B for ball",
            "K for Lamp",
            "D for goat",
            "Q for queen",
            "S for ship",
            "Z for Xylophone",
            "H for Tree",
            "L for lamp",
            "U for vase",
            "P for pencil"
    };
    public static int[] images =new int []{
            R.drawable.balll,R.drawable.lamp,R.drawable.goat,R.drawable.queen,R.drawable.ship,R.drawable.xlophon,R.drawable.tree,R.drawable.lamp,R.drawable.vase,R.drawable.pencil
    };
    public static boolean[] answers = new boolean[]{
            true,false,false,true,true,false,false,true,false,true
    };

    }
