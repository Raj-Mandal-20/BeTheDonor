package com.example.bethedonor.ui.components


import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.PhoneInTalk
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CardElevation
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.data.dataModels.Donor
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.Gray2
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.fadeBlue1
import com.example.bethedonor.ui.theme.fadeBlue11
import com.example.bethedonor.ui.theme.fadeBlue2


@Composable
fun AcceptorDetailsCard(donnerDetails: Donor) {

    Card(
        modifier = Modifier.fillMaxWidth().padding(8.dp),
        shape = RoundedCornerShape(10.dp),
        elevation = CardDefaults.cardElevation(
            defaultElevation = 0.dp
        ),
        colors = CardDefaults.cardColors(
            containerColor = Color.Transparent
        )
    ) {
        Box(
            modifier = Modifier
                .background(
                    color = fadeBlue11,
                ),
            contentAlignment = Alignment.Center
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Box(
                            modifier = Modifier
                                .height(60.dp)
                                .width(60.dp)
                                .background(fadeBlue1, RoundedCornerShape(30.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Outlined.Person,
                                contentDescription = "profile",
                                modifier = Modifier.size(40.dp),
                                tint = Gray2
                            )
                        }

                        Spacer(modifier = Modifier.width(16.dp))
                        Column(
                            verticalArrangement = Arrangement.Center,
                            horizontalAlignment = Alignment.Start
                        ) {
                            Text(
                                text = donnerDetails.name
                                    ?: "N/A", // or provide a suitable default value
                                style = TextStyle(fontSize = 16.sp),
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "${donnerDetails.state}, ${donnerDetails.district},${donnerDetails.city}, ${donnerDetails.pin}",
                                style = TextStyle(fontSize = 14.sp),
                                color = Color.Gray,
                                minLines = 2,
                                lineHeight = 16.sp,
                                modifier = Modifier.fillMaxWidth(0.6f)
                            )
                        }
                    }

                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = donnerDetails.bloodGroup ?: "Unknown",
                            style = TextStyle(fontSize = 18.sp),
                            fontWeight = FontWeight.ExtraBold,
                            color = bloodRed2
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Box(
                            modifier = Modifier
                                .height(40.dp)
                                .width(40.dp)
                                .background(fadeBlue1, RoundedCornerShape(30.dp))
                                .clickable {
                                    //
                                },
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Outlined.PhoneInTalk,
                                contentDescription = "phone",
                                modifier = Modifier.size(20.dp),
                                tint = bloodRed2
                            )
                        }
                    }
                }

            }
        }
    }
}

@Preview
@Composable
fun AcceptorDetailsCardPreview() {
    AcceptorDetailsCard(
        donnerDetails = Donor(
            name = "Chayandev Bera",
            email = "abcd@gmail.com",
            phoneNumber = "2848944",
            state = "West Bengal",
            city = "Kolkata",
            district = "Dhapa",
            pin = "700105",
            bloodGroup = "B+",
        )
    )
}