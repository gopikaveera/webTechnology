package com.example.emailsenderapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Patterns;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    EditText email, subject, message;
    Button sendBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        email = findViewById(R.id.email);
        subject = findViewById(R.id.subject);
        message = findViewById(R.id.message);
        sendBtn = findViewById(R.id.sendBtn);

        sendBtn.setOnClickListener(v -> {

            String recipient = email.getText().toString().trim();
            String sub = subject.getText().toString().trim();
            String msg = message.getText().toString().trim();

            if (recipient.isEmpty() || sub.isEmpty() || msg.isEmpty()) {
                Toast.makeText(MainActivity.this, "All fields are required", Toast.LENGTH_SHORT).show();
                return;
            }

            if (!Patterns.EMAIL_ADDRESS.matcher(recipient).matches()) {
                Toast.makeText(MainActivity.this, "Enter valid email", Toast.LENGTH_SHORT).show();
                return;
            }

            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.setType("message/rfc822");
            intent.putExtra(Intent.EXTRA_EMAIL, new String[]{recipient});
            intent.putExtra(Intent.EXTRA_SUBJECT, sub);
            intent.putExtra(Intent.EXTRA_TEXT, msg);

            try {
                startActivity(Intent.createChooser(intent, "Send Email"));
            } catch (android.content.ActivityNotFoundException ex) {
                Toast.makeText(MainActivity.this, "No email app installed.", Toast.LENGTH_SHORT).show();
            }

            if (intent.resolveActivity(getPackageManager()) != null) {
                startActivity(intent);
            } else {
                Toast.makeText(MainActivity.this, "No email app found", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
