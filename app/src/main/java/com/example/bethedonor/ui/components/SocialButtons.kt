package com.example.bethedonor.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.bethedonor.R

@Preview
@Composable
fun SocialButtons() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(40.dp)
                .border(width = 1.dp, shape = RoundedCornerShape(8.dp), color = Color.LightGray)
                .clip(RoundedCornerShape(8.dp))
                .clickable {

                },
            contentAlignment = Alignment.Center,
        ) {
//            Image(
//                painter = painterResource(R.drawable.google),
//                contentDescription = "google",
//                Modifier.size(20.dp)
//
//            )
        }
        Spacer(modifier = Modifier.size(30.dp))
        Box(
            modifier = Modifier
                .size(40.dp)
                .border(width = 1.dp, shape = RoundedCornerShape(8.dp), color = Color.LightGray)
                .clip(RoundedCornerShape(8.dp))
                .clickable {

                },
            contentAlignment = Alignment.Center,
        ) {
//            Image(
//               // painter = painterResource(R.drawable.facebook),
//                contentDescription = "facebook",
//                Modifier.size(20.dp)
//            )
        }
    }
}