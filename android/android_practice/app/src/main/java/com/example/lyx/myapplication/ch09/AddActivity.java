package com.example.lyx.myapplication.ch09;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.lyx.myapplication.R;

/**
 * Created by lyx on 2016/7/19.
 */
public class AddActivity extends Activity {
    private EditText et1, et2, et3;
    private Button b1;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.add);
        setTitle("Add Collection");

        et1 = (EditText)findViewById(R.id.EditTextName);
        et2 = (EditText)findViewById(R.id.EditTextUrl);
        et3 = (EditText)findViewById(R.id.EditTextDesc);

        b1 = (Button)findViewById(R.id.ButtonAdd);
        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String name = et1.getText().toString();
                String url = et2.getText().toString();
                String desc = et3.getText().toString();

                ContentValues values = new ContentValues();
                values.put("name", name);
                values.put("url", url);
                values.put("desc", desc);

                DBHelper helper = new DBHelper(getApplicationContext());
                helper.insert(values);
                Intent intent = new Intent(AddActivity.this, QueryActivity.class);
                startActivity(intent);
            }
        });
    }
}
