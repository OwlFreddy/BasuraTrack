package edu.cit.cardoso.basuratrack.data.network

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

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

interface ApiService {
    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<RegisterResponse>

    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>
}