package com.example.bethedonor.ui.main_screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.TabRowDefaults
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.bethedonor.ui.theme.bgDarkBlue
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.fadeBlue1
import com.example.bethedonor.ui.theme.fadeBlue11
import com.example.bethedonor.ui.theme.lightGray
import com.google.accompanist.systemuicontroller.rememberSystemUiController

data class TabItem(
    val title: String
)

@Composable
fun HistoryScreen(navController: NavHostController, uId: String) {
    val tabItem = listOf(
        TabItem("Requests"),
        TabItem("Donations")
    )
    val pagerState = rememberPagerState {
        tabItem.size
    }
    var selectedTabIndex by remember {
        mutableIntStateOf(0)
    }
    // Update the pager state when the selected tab index changes
    LaunchedEffect(selectedTabIndex) {
        pagerState.scrollToPage(selectedTabIndex)
    }

    // Update the selected tab index when the pager state changes
    LaunchedEffect(pagerState.currentPage) {
        selectedTabIndex = pagerState.currentPage
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
                    ), contentAlignment = Alignment.Center
            ) {
                Column(modifier = Modifier.fillMaxWidth()) {
                    TabRow(
                        selectedTabIndex = selectedTabIndex,
                        containerColor = fadeBlue11,
                        indicator = { tabPositions ->
                            TabRowDefaults.PrimaryIndicator(
                                modifier = Modifier.tabIndicatorOffset(tabPositions[selectedTabIndex]),
                                width = LocalConfiguration.current.screenWidthDp.dp / 2,
                                height = 2.dp,
                                color = bloodRed2
                            )
                        },
                        divider = { HorizontalDivider(Modifier.height(1.dp), color = lightGray) }) {
                        tabItem.forEachIndexed { index, tabItem ->
                            Tab(
                                selected = index == selectedTabIndex,
                                onClick = {
                                    selectedTabIndex = index
                                },
                                text = { Text(text = tabItem.title, color = Color.White) },
                                )
                        }
                    }
                    HorizontalPager(
                        state = pagerState, modifier = Modifier
                            .fillMaxWidth()
                            .weight(1f)
                    ) { index ->
                        Box(
                            modifier = Modifier.fillMaxSize(),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(text = tabItem[index].title)
                        }
                    }
                }
            }
        }
    }
}