package edu.cit.cardoso.basuratrack.data.network

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import edu.cit.cardoso.basuratrack.R
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.GET

data class RegisterRequest(
    val fullName: String,
    val email: String,
    val password: String,
    val barangay: String,
    val contactNumber: String
)

data class LoginRequest(
    val email: String,
    val password: String
)

data class RegisterResponse(
    val id: Long? = null,
    val fullName: String? = null,
    val email: String? = null,
    val barangay: String? = null,
    val contactNumber: String? = null,
    val role: String? = null
)

data class LoginResponse(
    val token: String,
    val userId: Long? = null,
    val fullName: String? = null,
    val email: String? = null,
    val role: String? = null,
    val barangay: String? = null
)

data class ScheduleResponse(
    val id: Long? = null,
    val barangay: String? = null,
    val dayOfWeek: String? = null,
    val time: String? = null,
    val wasteType: String? = null,
    val notes: String? = null
)

interface ApiService {
    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<RegisterResponse>

    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>

    @GET("schedules")
    suspend fun getSchedules(): Response<List<ScheduleResponse>>
}