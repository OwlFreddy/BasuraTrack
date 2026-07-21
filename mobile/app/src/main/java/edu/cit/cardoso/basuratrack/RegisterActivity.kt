package edu.cit.cardoso.basuratrack

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import edu.cit.cardoso.basuratrack.data.network.RegisterRequest
import edu.cit.cardoso.basuratrack.data.network.RetrofitClient
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val etFullName = findViewById<EditText>(R.id.etFullName)
        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val etBarangay = findViewById<EditText>(R.id.etBarangay)
        val etContactNumber = findViewById<EditText>(R.id.etContactNumber)
        val btnRegister = findViewById<Button>(R.id.btnRegister)
        val tvGoToLogin = findViewById<TextView>(R.id.tvGoToLogin)
        val tvMessage = findViewById<TextView>(R.id.tvRegisterMessage)

        btnRegister.setOnClickListener {
            val request = RegisterRequest(
                fullName = etFullName.text.toString(),
                email = etEmail.text.toString(),
                password = etPassword.text.toString(),
                barangay = etBarangay.text.toString(),
                contactNumber = etContactNumber.text.toString()
            )

            lifecycleScope.launch {
                try {
                    val response = RetrofitClient.apiService.register(request)
                    if (response.isSuccessful) {
                        tvMessage.text = "Registration successful! Welcome, ${response.body()?.fullName}"
                    } else {
                        tvMessage.text = "Registration failed: ${response.code()}"
                    }
                } catch (e: Exception) {
                    tvMessage.text = "Error: ${e.message}"
                }
            }
        }

        tvGoToLogin.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }
}