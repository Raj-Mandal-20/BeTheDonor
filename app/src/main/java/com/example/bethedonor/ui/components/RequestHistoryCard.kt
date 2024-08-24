package com.example.bethedonor.ui.components

import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.combinedClickable
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
import androidx.compose.material.icons.filled.DeleteForever
import androidx.compose.material.icons.outlined.AccessTime
import androidx.compose.material.icons.outlined.Bloodtype
import androidx.compose.material.icons.outlined.Timer
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.VerticalDivider
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.R
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.Gray3
import com.example.bethedonor.ui.theme.activeColor1
import com.example.bethedonor.ui.theme.fadeBlue1
import com.example.bethedonor.ui.theme.fadeBlue2
import com.example.bethedonor.ui.theme.teal

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun RequestHistoryCard(
    donationCenter: String = "NRS Hospital",
    state: String = "West Bengal",
    district: String = "Kolkata",
    pin: String = "700105",
    count: Int = 4,
    bloodGroup: String = "B+",
    bloodUnit: String = "5",
    createdAt: String = "2024-06-05",
    deadline: String = "2024-06-05",
    activeStatus: Boolean = true,
    onAcceptorIconClick: () -> Unit = {},
    onDeleteConfirmation: () -> Unit = {}
) {
    var expanded by remember { mutableStateOf(false) }
    var isDialogVisible by remember { mutableStateOf(false) }

    if (isDialogVisible) {
        WarningDialog(
            icon = Icons.Filled.DeleteForever,
            dialogTitle = "Delete Request",
            dialogText = "Are you sure you want to delete this request post? This action will remove the post permanently and cannot be undone.",
            onDismissRequest = { isDialogVisible = false },
            onConfirmation = {
                isDialogVisible = false
                onDeleteConfirmation()
            }
        )
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(start = 8.dp, end = 8.dp, top = 8.dp)
            .combinedClickable(
                onLongClick = {
                    isDialogVisible=true
                },
                onClick = {
                    //
                }
            ),
        shape = RoundedCornerShape(8.dp),
        elevation = CardDefaults.cardElevation(
            defaultElevation = 4.dp
        ),
        colors = CardDefaults.cardColors(
            containerColor = Color.Transparent
        )
    ) {
        Box(
            modifier = Modifier
                .background(
                    brush = Brush.linearGradient(
                        colors = listOf(fadeBlue1, fadeBlue2),
                        start = Offset.Zero,
                        end = Offset.Infinite
                    )
                ), contentAlignment = Alignment.Center
        ) {
            Column(
                verticalArrangement = Arrangement.spacedBy(6.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
                    .animateContentSize(
                        animationSpec = spring(
                            dampingRatio = Spring.DampingRatioLowBouncy,
                            stiffness = Spring.StiffnessMedium
                        )
                    )
            ) {
                Box {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            Modifier.fillMaxWidth(0.8f),
                            horizontalArrangement = Arrangement.Start,
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
                                Text(
                                    text = donationCenter,
                                    style = TextStyle(fontSize = MaterialTheme.typography.bodyLarge.fontSize),
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    modifier = Modifier.fillMaxWidth(0.75f)
                                )
                                Spacer(modifier = Modifier.height(4.dp))
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
                                Spacer(modifier = Modifier.height(6.dp))
                                Text(
                                    text = "Request Location",
                                    style = TextStyle(
                                        color = Color.Gray,
                                        fontSize = MaterialTheme.typography.labelMedium.fontSize
                                    )
                                )
                            }

                        }
                        Column(
                            verticalArrangement = Arrangement.Center,
                            horizontalAlignment = Alignment.End
                        ) {
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
                            ExpandableButtonComponent(
                                expanded = expanded,
                                onClick = { expanded = !expanded }
                            )
                        }
                    }
                }
                if (expanded) {
                    Box(modifier = Modifier.padding(start = 56.dp)) {
                        Row(
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(bottom = 8.dp)
                        ) {
                            Column(
                                verticalArrangement = Arrangement.spacedBy(4.dp),
                                horizontalAlignment = Alignment.Start,
                                modifier = Modifier.weight(1f)
                            ) {
                                IconTextComponent(
                                    icon = rememberVectorPainter(image = Icons.Outlined.Timer),
                                    text = deadline
                                )
                                IconTextComponent(
                                    icon = rememberVectorPainter(image = Icons.Outlined.AccessTime),
                                    text = createdAt
                                )
                            }
                            Column(
                                verticalArrangement = Arrangement.spacedBy(4.dp),
                                horizontalAlignment = Alignment.Start,
                            ) {
                                IconTextComponent(
                                    rememberVectorPainter(image = Icons.Outlined.Bloodtype),
                                    text = bloodGroup
                                )
                                IconTextComponent(
                                    icon = painterResource(id = R.drawable.ic_blood_drop),
                                    text = "$bloodUnit Units"
                                )
                            }
                        }
                    }

                }

                Box {
                    Row(
                        modifier = Modifier
                            .padding(start = 48.dp)
                            .clickable {
                                onAcceptorIconClick()
                            },
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy((-12).dp)
                    ) {
                        if (count <= 3) {
                            for (i in 1..count) {
                                UserIconComponent()
                            }
                        } else {
                            for (i in 1..3) {
                                UserIconComponent()
                            }
                        }
                        Spacer(modifier = Modifier.width(25.dp))
                        Text(
                            text = if (count - 3 > 0) "+${count - 3} Acceptors" else if (count == 0) "0 Acceptors" else " Acceptors",
                            style = TextStyle(
                                color = Gray1,
                                fontSize = MaterialTheme.typography.labelLarge.fontSize,
                                fontStyle = FontStyle.Italic,
                            ),
                        )
                    }
                }

            }
        }
    }
}


@Composable
fun IconTextComponent(icon: Painter, text: String, modifier: Modifier = Modifier) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            painter = icon, contentDescription = text,
            tint = Gray1,
            modifier = Modifier.size(20.dp)
        )

        Text(text = text, color = Color.LightGray)
    }
}

@Composable
fun UserIconComponent() {
    Image(
        imageVector = ImageVector.vectorResource(id = R.drawable.ic_profile),
        contentDescription = "Profile",
        modifier = Modifier.size(40.dp)
    )
}

@Composable
fun AddressTExtComponent(value: String) {
    Text(
        text = value,
        style = TextStyle(fontSize = MaterialTheme.typography.labelLarge.fontSize),
        fontWeight = FontWeight.SemiBold,
        color = Gray3
    )
}

@Composable
fun VerticalDividerComponent() {
    VerticalDivider(
        modifier = Modifier
            .height(12.dp)
            .width(4.dp),
        color = Gray3
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