package com.example.calculatorapp;

import android.os.Bundle;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    EditText num1, num2;
    TextView result;
    Button add, sub, mul, div, clear;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        num1 = findViewById(R.id.num1);
        num2 = findViewById(R.id.num2);
        result = findViewById(R.id.result);

        add = findViewById(R.id.add);
        sub = findViewById(R.id.sub);
        mul = findViewById(R.id.mul);
        div = findViewById(R.id.div);
        clear = findViewById(R.id.clear);

        add.setOnClickListener(v -> calculate("+"));
        sub.setOnClickListener(v -> calculate("-"));
        mul.setOnClickListener(v -> calculate("*"));
        div.setOnClickListener(v -> calculate("/"));

        clear.setOnClickListener(v -> {
            num1.setText("");
            num2.setText("");
            result.setText("Result: ");
        });
    }

    private void calculate(String op) {

        String s1 = num1.getText().toString().trim();
        String s2 = num2.getText().toString().trim();

        // Validation
        if (s1.isEmpty() || s2.isEmpty()) {
            Toast.makeText(this, "Enter both numbers", Toast.LENGTH_SHORT).show();
            return;
        }

        try {
            double n1 = Double.parseDouble(s1);
            double n2 = Double.parseDouble(s2);
            double res = 0;

            switch (op) {
                case "+":
                    res = n1 + n2;
                    break;
                case "-":
                    res = n1 - n2;
                    break;
                case "*":
                    res = n1 * n2;
                    break;
                case "/":
                    if (n2 == 0) {
                        Toast.makeText(this, "Cannot divide by zero", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    res = n1 / n2;
                    break;
            }

            result.setText("Result: " + res);

        } catch (Exception e) {
            Toast.makeText(this, "Invalid Input", Toast.LENGTH_SHORT).show();
        }
    }
}
