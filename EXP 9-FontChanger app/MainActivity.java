package com.example.font_change;

import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;


import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.res.ResourcesCompat;

public class MainActivity extends AppCompatActivity {

    TextView sampleText;

    Button fontBtn, styleBtn, colorBtn;
    Spinner fontSpinner, styleSpinner, colorSpinner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sampleText = findViewById(R.id.sampleText);

        fontBtn = findViewById(R.id.fontBtn);
        styleBtn = findViewById(R.id.styleBtn);
        colorBtn = findViewById(R.id.colorBtn);

        fontSpinner = findViewById(R.id.fontSpinner);
        styleSpinner = findViewById(R.id.styleSpinner);
        colorSpinner = findViewById(R.id.colorSpinner);

        // FONT ADAPTER
        setAdapter(fontSpinner, R.array.font_list);

        // STYLE ADAPTER
        setAdapter(styleSpinner, R.array.style_list);

        // COLOR ADAPTER
        setAdapter(colorSpinner, R.array.color_list);

        // SHOW/HIDE FONT
        fontBtn.setOnClickListener(v -> toggleSpinner(fontSpinner));

        fontSpinner.setOnItemSelectedListener(new SimpleItemSelectedListener() {
            @Override
            public void onItemSelected(String item) {

                Typeface tf = null;

                switch (item) {
                    case "Roboto":
                        tf = ResourcesCompat.getFont(MainActivity.this, R.font.roboto_regular);
                        break;

                    case "Lato":
                        tf = ResourcesCompat.getFont(MainActivity.this, R.font.lato_regular);
                        break;

                    case "Open Sans":
                        tf = ResourcesCompat.getFont(MainActivity.this, R.font.open_sans_regular);
                        break;
                }

                sampleText.setTypeface(tf);


            }
        });

        // STYLE
        styleBtn.setOnClickListener(v -> toggleSpinner(styleSpinner));

        styleSpinner.setOnItemSelectedListener(new SimpleItemSelectedListener() {
            @Override
            public void onItemSelected(String item) {

                if (item.equals("Bold")) {
                    sampleText.setTypeface(sampleText.getTypeface(), Typeface.BOLD);
                } else if (item.equals("Italic")) {
                    sampleText.setTypeface(sampleText.getTypeface(), Typeface.ITALIC);
                } else {
                    sampleText.setTypeface(Typeface.DEFAULT);
                }
            }
        });

        // COLOR
        colorBtn.setOnClickListener(v -> toggleSpinner(colorSpinner));

        colorSpinner.setOnItemSelectedListener(new SimpleItemSelectedListener() {
            @Override
            public void onItemSelected(String item) {

                switch (item) {
                    case "Black":
                        sampleText.setTextColor(Color.BLACK);
                        break;
                    case "Red":
                        sampleText.setTextColor(Color.RED);
                        break;
                    case "Blue":
                        sampleText.setTextColor(Color.BLUE);
                        break;
                    case "Green":
                        sampleText.setTextColor(Color.GREEN);
                        break;
                    case "Orange":
                        sampleText.setTextColor(Color.parseColor("#FF5722"));
                        break;
                }
            }
        });
    }

    // Helper method
    private void setAdapter(Spinner spinner, int array) {
        ArrayAdapter<CharSequence> adapter =
                ArrayAdapter.createFromResource(this, array,
                        android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
    }

    private void toggleSpinner(Spinner spinner) {
        spinner.setVisibility(spinner.getVisibility() == View.VISIBLE ? View.GONE : View.VISIBLE);
    }

    // Simple listener helper class
    abstract static class SimpleItemSelectedListener implements android.widget.AdapterView.OnItemSelectedListener {
        public abstract void onItemSelected(String item);

        @Override
        public void onItemSelected(android.widget.AdapterView<?> parent, View view, int position, long id) {
            onItemSelected(parent.getItemAtPosition(position).toString());
        }

        @Override
        public void onNothingSelected(android.widget.AdapterView<?> parent) {}
    }
}
