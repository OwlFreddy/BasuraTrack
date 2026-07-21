package edu.cit.cardoso.basuratrack

import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import edu.cit.cardoso.basuratrack.data.network.LoginRequest
import edu.cit.cardoso.basuratrack.data.network.RetrofitClient
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val tvGoToRegister = findViewById<TextView>(R.id.tvGoToRegister)
        val tvMessage = findViewById<TextView>(R.id.tvLoginMessage)

        btnLogin.setOnClickListener {
            val request = LoginRequest(
                email = etEmail.text.toString(),
                password = etPassword.text.toString()
            )

            lifecycleScope.launch {
                try {
                    val response = RetrofitClient.apiService.login(request)
                    if (response.isSuccessful) {
                        val body = response.body()
                        tvMessage.text = "Login successful! Welcome, ${body?.fullName}"

                        // Save token + user info locally
                        val prefs: SharedPreferences = getSharedPreferences("BasuraTrackPrefs", MODE_PRIVATE)
                        prefs.edit().apply {
                            putString("token", body?.token)
                            putString("fullName", body?.fullName)
                            putString("email", body?.email)
                            putString("barangay", body?.barangay)
                            putString("role", body?.role)
                            apply()
                        }

                        // Go to Dashboard
                        startActivity(Intent(this@LoginActivity, DashboardActivity::class.java))
                        finish()
                    } else {
                        tvMessage.text = "Invalid email or password."
                    }
                } catch (e: Exception) {
                    tvMessage.text = "Error: ${e.message}"
                }
            }
        }

        tvGoToRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }
}