package edu.cit.cardoso.basuratrack

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import edu.cit.cardoso.basuratrack.data.network.RetrofitClient
import kotlinx.coroutines.launch

class ScheduleListActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_schedule_list)

        val rvSchedules = findViewById<RecyclerView>(R.id.rvSchedules)
        val tvEmptyState = findViewById<TextView>(R.id.tvEmptyState)

        rvSchedules.layoutManager = LinearLayoutManager(this)

        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getSchedules()
                if (response.isSuccessful) {
                    val schedules = response.body() ?: emptyList()
                    if (schedules.isEmpty()) {
                        tvEmptyState.visibility = android.view.View.VISIBLE
                    } else {
                        rvSchedules.adapter = ScheduleAdapter(schedules)
                    }
                } else {
                    tvEmptyState.visibility = android.view.View.VISIBLE
                    tvEmptyState.text = "Failed to load schedules."
                }
            } catch (e: Exception) {
                tvEmptyState.visibility = android.view.View.VISIBLE
                tvEmptyState.text = "Error: ${e.message}"
            }
        }
    }
}