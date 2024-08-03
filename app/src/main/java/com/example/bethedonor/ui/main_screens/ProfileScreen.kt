package com.example.bethedonor.ui.main_screens

import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DoNotDisturbAlt
import androidx.compose.material.icons.filled.ModeNight
import androidx.compose.material.icons.filled.Person2
import androidx.compose.material.icons.outlined.Bloodtype
import androidx.compose.material.icons.outlined.DateRange
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Phone
import androidx.compose.material.icons.outlined.Transgender
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonColors
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.zIndex
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.bethedonor.data.api.ProfileResponse
import com.example.bethedonor.ui.components.ButtonComponent
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.activeColor1
import com.example.bethedonor.ui.theme.activeColor2
import com.example.bethedonor.ui.theme.bgDarkBlue
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.bloodTrashparent2
import com.example.bethedonor.ui.theme.darkGray
import com.example.bethedonor.ui.theme.moonNightColor
import com.example.bethedonor.ui.theme.teal
import com.example.bethedonor.utils.formatDate
import com.example.bethedonor.utils.getInitials
import com.example.bethedonor.viewmodels.ProfileViewModel
import kotlinx.coroutines.launch
import java.util.Date

@Composable
fun ProfileScreen(
    authToken: String,
    innerPadding: PaddingValues,
    profileViewmodel: ProfileViewModel = viewModel(),
    onLogOutNavigate: () -> Unit
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    var profileData by remember { mutableStateOf<ProfileResponse?>(null) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    val profileResponse by profileViewmodel.profileResponse.observeAsState()
    // val deleteAccountResponse by profileViewmodel.deleteAccountResponse.collectAsState()
    LaunchedEffect(Unit) {
        Log.d("authToken", authToken)
        profileViewmodel.getProfile(token = authToken, onProfileFetched = {
            profileResponse?.let {
                if (it.isSuccess) {
                    profileData = it.getOrNull()
                } else {
                    errorMessage = it.exceptionOrNull()?.message
                }
            }
        })
    }
    Box(
        modifier = Modifier
            .fillMaxSize(), contentAlignment = Alignment.Center
    ) {
        Surface(
            modifier = Modifier
                .fillMaxSize(),
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        color = bgDarkBlue
                    )
            ) {
                //  if(profileData!=null){
                profileData?.myProfile?.let {
                    Column(
                        verticalArrangement = Arrangement.Center,
                        modifier = Modifier
                            .verticalScroll(
                                rememberScrollState()
                            )
                            .padding(
                                start = 16.dp,
                                end = 16.dp,
                                top = 30.dp,
                                bottom = innerPadding.calculateBottomPadding() * 2
                            )
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceEvenly
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(80.dp)
                                    .background(bloodRed2, shape = RoundedCornerShape(60.dp)),
                                contentAlignment = Alignment.Center
                            ) {
                                if (it.available == true) {
                                    Canvas(modifier = Modifier.fillMaxSize()) {
                                        val imageWidth = 80.dp.toPx()
                                        val radius = imageWidth / 2f
                                        val overlapAmount = radius / 3f
                                        val iconSize =
                                            overlapAmount * 1.5f // Reduce the size of the indicator

                                        val iconCenterX =
                                            (size.width / 2f) + (imageWidth / 2f) - overlapAmount
                                        val iconCenterY =
                                            (size.height / 2f) + (imageWidth / 2f) - overlapAmount

                                        val arcStartAngle =
                                            140f // Start angle for the arc in degrees
                                        val arcSweepAngle =
                                            2500f // Sweep angle for the arc in degrees

                                        val arcRect = androidx.compose.ui.geometry.Rect(
                                            left = (iconCenterX - iconSize / 2f),
                                            top = (iconCenterY - iconSize / 2f),
                                            right = (iconCenterX + iconSize / 2f),
                                            bottom = (iconCenterY + iconSize / 2f)
                                        )

                                        drawCircle(
                                            color = bloodRed2,
                                            radius = radius,
                                            center = Offset(size.width / 2f, size.height / 2f)
                                        )

                                        drawArc(
                                            color = bgDarkBlue,
                                            startAngle = arcStartAngle,
                                            sweepAngle = arcSweepAngle,
                                            useCenter = false,
                                            topLeft = arcRect.topLeft,
                                            size = Size(arcRect.width, arcRect.height),
                                            style = Stroke(width = 12f)
                                        )

                                        drawCircle(
                                            color = activeColor1,
                                            radius = iconSize / 2f,
                                            center = Offset(iconCenterX, iconCenterY)
                                        )
                                    }
                                }
                                // Green Dot
                                Text(
                                    text = "${it.name?.let { it1 -> getInitials(it1) }}",
                                    fontSize = MaterialTheme.typography.headlineLarge.fontSize,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                            }  // Green Dot positioned on top of the text

                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.SpaceEvenly,
                                modifier = Modifier.weight(1f)

                            ) {
                                TextComponent(
                                    value = it.requests?.size ?: 0,
                                    label = "Requested"
                                )
                                TextComponent(
                                    value = it.donates?.size ?: 0,
                                    label = "Donated"
                                )
                            }

                        }
                        SpacerComponent(12.dp)
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            BoldTextComponent(label = it.name ?: "John Dao")
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(1.dp)
                            ) {
                                if (it.available == false)
                                    Icon(
                                        //imageVector = Icons.Filled.ModeNight,
                                        imageVector = Icons.Filled.DoNotDisturbAlt,
                                        contentDescription = "Not Available",
                                        tint = bloodTrashparent2
                                       // tint = moonNightColor,
                                       // modifier = Modifier.rotate(45F)
                                    )
                                Text(
                                    text = if (it.available == true) "Available" else "Not Available",
                                    color = if (it.available == true) Color.White else Color.LightGray,
                                    fontSize = MaterialTheme.typography.bodyLarge.fontSize
                                )
                            }
                        }
                        SpacerComponent(4.dp)
                        Text(
                            text = it.email ?: "xyz@gmail.com",
                            color = Color.LightGray
                        )
                        SpacerComponent(16.dp)
                        ButtonElement(label = "Sing out", onClick = {
                            coroutineScope.launch {
                                profileViewmodel.logoutUser(onLogout = {
                                    onLogOutNavigate()
                                })
                                Toast.makeText(context, "Logged out", Toast.LENGTH_SHORT).show()
                            }
                        })
                        SpacerComponent(dp = 24.dp)
                        BoldTextComponent(label = "Personal Information")
                        SpacerComponent(dp = 20.dp)
                        InformationComponent(
                            icon = Icons.Outlined.Home,
                            label = "Address",
                            value = "${it.state}, ${it.district}, ${it.city}, ${
                                it.pin
                            }"
                        )
                        InformationComponent(
                            icon = Icons.Outlined.Phone,
                            label = "Phone",
                            value = it.phoneNumber ?: "175483758"
                        )
                        InformationComponent(
                            icon = Icons.Outlined.Transgender,
                            label = "Gender",
                            value = it.gender ?: "Male"
                        )
                        InformationComponent(
                            icon = Icons.Outlined.Bloodtype,
                            label = "Blood Group",
                            value = it.bloodGroup ?: "B+"
                        )
                        InformationComponent(
                            icon = Icons.Outlined.DateRange,
                            label = "DOB",
                            value = formatDate(it.dob ?: Date(0))
                        )
                        ButtonElement(label = "Edit profile", onClick = {

                        })
                        SpacerComponent(16.dp)
                        ButtonComponent(
                            text = "Delete Account",
                            onButtonClick = {
                                profileViewmodel.deleteAccount(token = authToken) { result ->
                                    if (result.isSuccess) {
                                        // Handle the success case
                                        val response = result.getOrNull()
                                        Toast.makeText(
                                            context,
                                            response?.message ?: "Account Deleted",
                                            Toast.LENGTH_SHORT
                                        ).show()

                                        // Proceed to logout after account deletion is successful
                                        coroutineScope.launch {
                                            profileViewmodel.logoutUser(onLogout = {
                                                onLogOutNavigate()
                                            })
                                        }
                                    } else {
                                        val error = result.exceptionOrNull()
                                        Toast.makeText(
                                            context,
                                            error?.message ?: "Failed to delete account",
                                            Toast.LENGTH_SHORT
                                        ).show()
                                    }
                                }
                            }
                        )

                    }

                }
            }
        }
        if (profileViewmodel.requestInProgress.value) {
            CircularProgressIndicator(
                modifier = Modifier.size(48.dp),
                color = teal,
                trackColor = Gray1
            )
        }
        if (errorMessage != null || (profileData?.message != null && profileData!!.message.isNotEmpty())) {
            errorMessage = errorMessage ?: profileData?.message
            Text(
                text = errorMessage.toString(),
                modifier = Modifier.padding(18.dp),
                style = TextStyle(
                    fontSize = 18.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = Color.LightGray
                )
            )
        }
    }
}

@Composable
fun ButtonElement(label: String, onClick: () -> Unit) {
    Button(
        onClick = onClick,
        colors = ButtonColors(
            containerColor = darkGray,
            contentColor = Color.White,
            disabledContentColor = Color.White,
            disabledContainerColor = darkGray
        ), shape = RoundedCornerShape(12.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(text = label, fontSize = 16.sp, fontWeight = FontWeight.SemiBold)
    }
}

@Composable
fun InformationComponent(icon: ImageVector, label: String, value: String) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.padding(bottom = 20.dp)
    ) {
        Box(
            modifier = Modifier
                .size(48.dp)
                .background(darkGray, shape = RoundedCornerShape(8.dp)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = icon,
                contentDescription = label,
                tint = Color.White,
                modifier = Modifier.size(24.dp)
            )
        }
        Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
            Text(
                text = label,
                fontSize = MaterialTheme.typography.bodyMedium.fontSize,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
            Text(
                text = value,
                fontSize = MaterialTheme.typography.bodyMedium.fontSize,
                color = Color.LightGray
            )
        }
    }
}

@Composable
fun BoldTextComponent(label: String) {
    Text(
        text = label,
        fontSize = MaterialTheme.typography.titleLarge.fontSize,
        fontWeight = FontWeight.SemiBold,
        color = Color.White
    )
}

@Composable
fun SpacerComponent(dp: Dp) {
    Spacer(modifier = Modifier.height(dp))
}

@Composable
fun TextComponent(value: Int?, label: String) {
    Column(
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = value.toString(),
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )
        Text(
            text = label,
            color = Color.White
        )
    }
}

@Preview
@Composable
fun ProfileScreenPreview() {
    ProfileScreen(
        authToken = "",
        innerPadding = PaddingValues(0.dp),
        onLogOutNavigate = {
            //
        }
    )
}