package com.example.bethedonor.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.VerticalDivider
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.R
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.activeColor1
import com.example.bethedonor.ui.theme.bgDarkBlue
import com.example.bethedonor.ui.theme.bloodRed
import com.example.bethedonor.ui.theme.teal

@Composable
fun RequestHistoryCard(
    state: String = "West Bengal",
    district: String = "Kolkata",
    pin: String = "700105",
    count: Int = 4,
    activeStatus: Boolean = true
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        shape = RoundedCornerShape(8.dp),
        elevation = CardDefaults.cardElevation(
            defaultElevation = 4.dp
        ),
        colors = CardDefaults.cardColors(
            containerColor = bgDarkBlue
        )
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .height(50.dp)
                            .width(50.dp)
                            .background(Color.White, RoundedCornerShape(30.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            painter = painterResource(id = R.drawable.ic_location),
                            contentDescription = "location",
                            tint = teal,
                            modifier = Modifier.size(40.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Column(
                        horizontalAlignment = Alignment.Start,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Row(
                            horizontalArrangement = Arrangement.Center,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            AddressTExtComponent(value = state)
                            Spacer(modifier = Modifier.width(8.dp))
                            VerticalDividerComponent()
                            Spacer(modifier = Modifier.width(8.dp))
                            AddressTExtComponent(value = district)
                            Spacer(modifier = Modifier.width(8.dp))
                            VerticalDividerComponent()
                            Spacer(modifier = Modifier.width(8.dp))
                            AddressTExtComponent(value = pin)
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(text = "Request Location", style = TextStyle(color = Color.Gray))
                    }

                }
                Box(
                    modifier = Modifier
                        .background(
                            color = if (activeStatus) activeColor1 else Color.Gray,
                            shape = RoundedCornerShape(50)
                        )
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = if (activeStatus) "Active" else "Closed",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color.White
                    )
                }
            }
            Spacer(modifier = Modifier.height(8.dp))
            Row(
                modifier = Modifier.padding(start = 48.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy((-8).dp)
            ) {
                if (count <= 3) {
                    for (i in 1..count) {
                        UserIconComponent()
                    }
                } else {
                    for (i in 1..3) {
                        UserIconComponent()
                    }
                    Spacer(modifier = Modifier.width(16.dp))
                    Text(
                        text = "+${count - 3} Acceptors",
                        style = TextStyle(color = Gray1)
                    )
                }
            }
        }
    }
}

@Composable
fun UserIconComponent() {
    Image(
        imageVector = ImageVector.vectorResource(id = R.drawable.ic_profile),
        contentDescription = "Profile",
    )
}

@Composable
fun AddressTExtComponent(value: String) {
    Text(
        text = value,
        style = TextStyle(),
        fontWeight = FontWeight.Bold,
        color = Color.White
    )
}

@Composable
fun VerticalDividerComponent() {
    VerticalDivider(
        modifier = Modifier
            .height(20.dp)
            .width(4.dp),
        color = Gray1
    )
}

@Preview
@Composable
fun RequestHistoryCardPreview(
    state: String = "West Bengal",
    district: String = "Kolkata",
    pin: String = "700105",
    count: Int = 4,
    activeStatus: Boolean = false
) {
    RequestHistoryCard()
}