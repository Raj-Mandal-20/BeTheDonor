package com.example.bethedonor.ui.components

import androidx.compose.animation.animateColor
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.TweenSpec
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Bloodtype
import androidx.compose.material.icons.outlined.Email
import androidx.compose.material.icons.outlined.LocationOn
import androidx.compose.material.icons.outlined.Phone
import androidx.compose.material.icons.outlined.Timer
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonColors
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.R
import com.example.bethedonor.data.dataModels.RequestCardDetails
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.Gray2
import com.example.bethedonor.ui.theme.activeColor1
import com.example.bethedonor.ui.theme.activeColor2
import com.example.bethedonor.ui.theme.bgDarkBlue2
import com.example.bethedonor.ui.theme.bloodRed
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.bloodRed3
import com.example.bethedonor.ui.theme.bloodTrashparent
import com.example.bethedonor.ui.theme.lightRed


@OptIn(ExperimentalLayoutApi::class)
@Composable
fun AllRequestCard(details: RequestCardDetails) {
    val gradientColors = listOf(bloodRed2, bloodRed3)
    val gradientBrush = Brush.linearGradient(
        colors = gradientColors,
        start = Offset(0f, 0f),
        end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY)
    )
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        shape = RoundedCornerShape(8.dp),
        border = BorderStroke(1.dp, bloodTrashparent),
        elevation = CardDefaults.cardElevation(
            defaultElevation = 6.dp
        ),
        colors = CardDefaults.cardColors(
            containerColor = Color.Transparent
        )
    ) {
        Box(
            modifier = Modifier
                .background(
                   bgDarkBlue2
                ), contentAlignment = Alignment.Center
        )
        {
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
                                .background(lightRed, RoundedCornerShape(30.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                painter = painterResource(id = R.drawable.ic_blood_drop),
                                contentDescription = "Blood Drop",
                                tint = bloodRed,
                                modifier = Modifier.size(30.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(16.dp))
                        Column(
                            verticalArrangement = Arrangement.spacedBy(4.dp),
                            horizontalAlignment = Alignment.Start
                        ) {
                            Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween){
                                Text(
                                    text = details.name,
                                    fontSize = MaterialTheme.typography.titleMedium.fontSize,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    modifier = Modifier.fillMaxWidth(0.72f)
                                )
                               RoundedBoxWithIconAndText(open =details.isOpen)
                            }
                            Column(
                                horizontalAlignment = Alignment.Start,
                                verticalArrangement = Arrangement.spacedBy(2.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.Center){
                                    Icon(
                                        imageVector = Icons.Outlined.Email,
                                        contentDescription = "Email Icon",
                                        tint = Gray1,
                                        modifier = Modifier.size(18.dp)
                                    )
                                    Text(
                                        text = if(details.isAcceptor || details.isMyCreation) details.emailId else "xyz@gmail.com",
                                        color = Gray1,
                                        modifier = Modifier.padding(start = 4.dp) // Add some padding between icon and text
                                    )
                                }
                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.Center){
                                    Icon(
                                        imageVector = Icons.Outlined.Phone,
                                        contentDescription = "Phone Icon",
                                        tint = Gray1,
                                        modifier = Modifier.size(18.dp)
                                    )
                                    Text(
                                        text = if(details.isAcceptor || details.isMyCreation) details.phoneNo else "xxxxxxxxxx",
                                        color = Gray1,
                                        modifier = Modifier.padding(start = 4.dp) // Add some padding between icon and text
                                    )
                                }
                            }

                        }
                    }
                }
                // Spacer(modifier = Modifier.height(16.dp))
                //  HorizontalDivider(color = Color.LightGray)
                Spacer(modifier = Modifier.height(16.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(
                        modifier = Modifier.weight(1f),
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.Start
                    ) {
                        Row(
                            horizontalArrangement = Arrangement.Center,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Outlined.LocationOn,
                                contentDescription = "center",
                                tint = Gray1,
                                modifier = Modifier.size(20.dp)
                            )
                            Text(
                                text = details.exactPlace,
                                color = Gray1,
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                        FlowRow(modifier = Modifier.padding(top = 4.dp), maxLines = 2, maxItemsInEachRow = 2) {
//                        Icon(
//                            imageVector = Icons.Outlined.MyLocation,
//                            contentDescription = "location", tint = Gray1,
//                            modifier = Modifier.size(20.dp)
//                        )
                            Text(
                                text = details.address,
                                color = Color.LightGray,
                                modifier = Modifier.padding(start = 18.dp)
                            )
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(
                            horizontalArrangement = Arrangement.Center,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Outlined.Timer,
                                contentDescription = "DeadLine",
                                tint = Gray1,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(text = details.dueDate, color = Color.LightGray)
                        }
                    }
                    Column(
                        modifier = Modifier,
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.Start
                    ) {
                        BloodUnitAndAcceptorCountComponent(
                            painterResource = rememberVectorPainter(image = Icons.Outlined.Bloodtype),
                            count = -1,
                            labelTExt = details.bloodGroup
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        BloodUnitAndAcceptorCountComponent(
                            painterResource(id = R.drawable.ic_blood_drop),
                            count = details.bloodUnit.toInt(),
                            labelTExt = "Blood Units"
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        BloodUnitAndAcceptorCountComponent(
                            painterResource(id = R.drawable.ic_acceptor),
                            count = details.noOfAcceptors,
                            labelTExt = "Acceptor(s)"
                        )
                        Spacer(modifier = Modifier.height(4.dp))

                    }
                }


//                Row(
//                    modifier = Modifier.fillMaxWidth(),
//                    verticalAlignment = Alignment.CenterVertically,
//                    horizontalArrangement = Arrangement.SpaceBetween
//                ) {
//                    BloodUnitAndAcceptorCountComponent(
//                        painterResource(id = R.drawable.ic_blood_drop),
//                        count = 80,
//                        labelTExt = "Blood Units"
//                    )
//                    BloodUnitAndAcceptorCountComponent(
//                        painterResource(id = R.drawable.ic_acceptor),
//                        count = 20,
//                        labelTExt = "Acceptor"
//                    )
//                }
                Spacer(modifier = Modifier.height(16.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Button(
                        onClick = { /*TODO*/ },
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonColors(
                            containerColor = Color.White,
                            contentColor = Color.Black,
                            disabledContentColor = Color.DarkGray,
                            disabledContainerColor = Color.LightGray
                        ),
                        enabled = details.isOpen && !details.isMyCreation && !details.isAcceptor
                    ) {
                        Text(text = if (details.isMyCreation) "Your Request" else if(details.isAcceptor) "Accepted" else if(details.isOpen) "Accept Donation" else "Request Closed", fontWeight = FontWeight.SemiBold)
                    }

                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Icon(
                            painter = painterResource(id = R.drawable.ic_time_past),
                            contentDescription = "Time Past",
                            tint = Color.LightGray,
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "${details.postDate} days ago",
                            style = TextStyle(
                                fontWeight = FontWeight.Normal,
                                color = Color.LightGray
                            )
                        )
                    }
                }
            }
        }
    }
}


@Composable
fun BloodUnitAndAcceptorCountComponent(painterResource: Painter, count: Int, labelTExt: String) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Center
    ) {
        Icon(
            painter = painterResource,
            contentDescription = labelTExt,
            tint = Gray1,
            modifier = Modifier.size(20.dp)
        )
        if (count >= 0) {
            Spacer(modifier = Modifier.width(4.dp))
            Text(
                text = count.toString(),
                style = TextStyle(
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 14.sp,
                    color = Gray1
                )
            )
        }
        Spacer(modifier = Modifier.width(4.dp))
        Text(
            text = labelTExt,
            style = TextStyle(
                fontWeight = if (count >= 0) FontWeight.Normal else FontWeight.SemiBold,
                color = Color.LightGray
            )
        )
    }
}

@Composable
fun BlinkingCircle() {
    val infiniteTransition = rememberInfiniteTransition(label = "anim")
    val color by infiniteTransition.animateColor(
        initialValue = activeColor2,
        targetValue = activeColor1,
        animationSpec = infiniteRepeatable(
            animation = TweenSpec(durationMillis = 500),
            repeatMode = RepeatMode.Reverse
        ), label = ""
    )

    Box(
        modifier = Modifier
            .size(12.dp)
            .background(color, shape = CircleShape)
    )
}

@Composable
fun RoundedBoxWithIconAndText(modifier: Modifier = Modifier, open: Boolean) {
    Box(
        modifier = modifier
            .background(Color.White, shape = RoundedCornerShape(50))
            .border(
                1.dp,
                if (open) activeColor2 else Color.LightGray,
                shape = RoundedCornerShape(50)
            )
            .padding(horizontal = 8.dp, vertical = 4.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
        ) {
            if (open)
                BlinkingCircle()
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = if (open) "Open" else "Closed",
                color = if (open) activeColor2 else Color.DarkGray,
                fontSize = 14.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}

@Preview
@Composable
fun AllRequestCardPreview() {
    AllRequestCard(
        details = RequestCardDetails(
            name = "Chayandev Bera",
            emailId = "abcd@gmail.com",
            phoneNo = "6549680439",
            address = "West Bengal, Kolkata\n Dhapa, 700105",
            exactPlace = "NRS",
            bloodUnit = "10",
            bloodGroup = "B+",
            noOfAcceptors = 20,
            dueDate = "Sun July 2024",
            postDate = "Fri July 2024",
            isOpen = true,
            isAcceptor = false,
            isMyCreation = false
        )
    )
}