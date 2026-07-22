package edu.cit.cardoso.basuratrack

import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class DashboardActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        val prefs: SharedPreferences = getSharedPreferences("BasuraTrackPrefs", MODE_PRIVATE)

        val tvWelcome = findViewById<TextView>(R.id.tvWelcome)
        val tvEmail = findViewById<TextView>(R.id.tvEmail)
        val tvBarangay = findViewById<TextView>(R.id.tvBarangay)
        val tvRole = findViewById<TextView>(R.id.tvRole)
        val btnViewSchedules = findViewById<Button>(R.id.btnViewSchedules)
        val btnLogout = findViewById<Button>(R.id.btnLogout)

        tvWelcome.text = "Welcome, ${prefs.getString("fullName", "")}!"
        tvEmail.text = "Email: ${prefs.getString("email", "")}"
        tvBarangay.text = "Barangay: ${prefs.getString("barangay", "")}"
        tvRole.text = "Role: ${prefs.getString("role", "")}"

        btnViewSchedules.setOnClickListener {
            startActivity(Intent(this, ScheduleListActivity::class.java))
        }

        btnLogout.setOnClickListener {
            prefs.edit().clear().apply()
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }
}