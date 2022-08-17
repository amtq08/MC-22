package com.example.myapplication;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;



public class LessonAdapter extends BaseAdapter {
    Context context;
    String[] listmy;
    int[] listimages;
    LayoutInflater inflater;
    public LessonAdapter(Context ctx,String [] mylist, int [] myImages){
        this.context=ctx;
        this.listmy=mylist;
        this.listimages=myImages;
        inflater=LayoutInflater.from(ctx);

    }
    @Override
    public int getCount() {
        return listmy.length;
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @SuppressLint({"ViewHolder", "InflateParams"})
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        convertView = inflater.inflate(R.layout.activity_lessonlistview,null);
        TextView txtView = (TextView) convertView.findViewById(R.id.txt1);
        ImageView pic = (ImageView) convertView.findViewById(R.id.imageIcon);
        txtView.setText(listmy[position]);
        pic.setImageResource(listimages[position]);
        return convertView;
    }
}
