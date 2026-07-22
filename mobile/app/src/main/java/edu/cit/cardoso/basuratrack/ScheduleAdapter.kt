package edu.cit.cardoso.basuratrack

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import edu.cit.cardoso.basuratrack.data.network.ScheduleResponse

class ScheduleAdapter(private val schedules: List<ScheduleResponse>) :
    RecyclerView.Adapter<ScheduleAdapter.ScheduleViewHolder>() {

    class ScheduleViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvBarangay: TextView = view.findViewById(R.id.tvBarangay)
        val tvDayTime: TextView = view.findViewById(R.id.tvDayTime)
        val tvWasteType: TextView = view.findViewById(R.id.tvWasteType)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ScheduleViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_schedule, parent, false)
        return ScheduleViewHolder(view)
    }

    override fun onBindViewHolder(holder: ScheduleViewHolder, position: Int) {
        val schedule = schedules[position]
        holder.tvBarangay.text = schedule.barangay ?: "Unknown Barangay"
        holder.tvDayTime.text = "${schedule.dayOfWeek ?: ""} - ${schedule.time ?: ""}"
        holder.tvWasteType.text = schedule.wasteType ?: "General waste"
    }

    override fun getItemCount(): Int = schedules.size
}