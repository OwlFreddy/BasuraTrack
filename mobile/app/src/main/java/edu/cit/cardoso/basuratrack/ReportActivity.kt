package edu.cit.cardoso.basuratrack

import android.content.SharedPreferences
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import edu.cit.cardoso.basuratrack.data.network.ReportRequest
import edu.cit.cardoso.basuratrack.data.network.RetrofitClient
import kotlinx.coroutines.launch

class ReportActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_report)

        val prefs: SharedPreferences = getSharedPreferences("BasuraTrackPrefs", MODE_PRIVATE)

        val etReporterName = findViewById<EditText>(R.id.etReporterName)
        val etReporterEmail = findViewById<EditText>(R.id.etReporterEmail)
        val etBarangay = findViewById<EditText>(R.id.etBarangay)
        val etDescription = findViewById<EditText>(R.id.etDescription)
        val btnSubmitReport = findViewById<Button>(R.id.btnSubmitReport)
        val tvMessage = findViewById<TextView>(R.id.tvReportMessage)

        etReporterName.setText(prefs.getString("fullName", ""))
        etReporterEmail.setText(prefs.getString("email", ""))
        etBarangay.setText(prefs.getString("barangay", ""))

        btnSubmitReport.setOnClickListener {
            val request = ReportRequest(
                reporterName = etReporterName.text.toString(),
                reporterEmail = etReporterEmail.text.toString(),
                barangay = etBarangay.text.toString(),
                description = etDescription.text.toString()
            )

            lifecycleScope.launch {
                try {
                    val response = RetrofitClient.apiService.submitReport(request)
                    if (response.isSuccessful) {
                        tvMessage.text = "Report submitted successfully!"
                        etDescription.setText("")
                    } else {
                        tvMessage.text = "Failed to submit report: ${response.code()}"
                    }
                } catch (e: Exception) {
                    tvMessage.text = "Error: ${e.message}"
                }
            }
        }
    }
}