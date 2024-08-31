package com.example.bethedonor.ui.main_screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CardElevation
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.bethedonor.R
import com.example.bethedonor.ui.theme.bgDarkBlue
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.bloodTransparent
import com.example.bethedonor.ui.theme.bloodTransparent2
import com.example.bethedonor.ui.theme.bloodTransparent3
import com.example.bethedonor.ui.theme.fadeBlue11
import com.example.bethedonor.viewmodels.HomeViewModel

data class CarouselItem(
    val id: Int,
    val description: String,
    val backgroundImage: Int
)

@Composable
fun HomeScreen(
    navController: NavHostController,
    innerPadding: PaddingValues,
    userId: String,
    homeViewModel: HomeViewModel
) {
    Scaffold(topBar = { AppTopBar() }, containerColor = bgDarkBlue) { padding ->
        Surface(
            color = bgDarkBlue, modifier = Modifier
                .padding(padding)
                .verticalScroll(
                    rememberScrollState()
                )
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Carousel(
                    listOf(
                        CarouselItem(
                            id = 1,
                            description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                            backgroundImage = R.drawable.ic_blood_donation
                        ),
                        CarouselItem(
                            id = 2,
                            description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                            backgroundImage = R.drawable.ic_blood_donation
                        ),
                        CarouselItem(
                            id = 3,
                            description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                            backgroundImage = R.drawable.ic_blood_donation
                        )
                    )
                )
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(16.dp),
                    modifier = Modifier.padding(16.dp)
                ) {
                    Box(
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = "The easiest way to save a life",
                            color = Color.White,
                            style = MaterialTheme.typography.headlineSmall,
                            fontWeight = FontWeight.Bold,
                        )
                    }
                }
                HorizontalScrollListOfSteps(
                    listOf(
                        CarouselItem(
                            id = 1,
                            description = "Lorem Ipsum is simply dummy",
                            backgroundImage = R.drawable.ic_step_1_donate
                        ),
                        CarouselItem(
                            id = 2,
                            description = "Lorem Ipsum is simply dummy",
                            backgroundImage = R.drawable.ic_step_1_donate
                        ),
                        CarouselItem(
                            id = 3,
                            description = "Lorem Ipsum is simply dummy",
                            backgroundImage = R.drawable.ic_step_1_donate
                        ),
                        CarouselItem(
                            id = 4,
                            description = "Lorem Ipsum is simply dummy",
                            backgroundImage = R.drawable.ic_step_1_donate
                        )
                    )
                )
            }

        }

    }

}

@Composable
fun HorizontalScrollListOfSteps(items: List<CarouselItem>) {
    LazyRow(state = rememberLazyListState(), horizontalArrangement = Arrangement.spacedBy(8.dp),contentPadding = PaddingValues(start = 8.dp, end = 8.dp)) {
        items(items = items, key = { item -> item.id }) { item ->
            DonationStepItem(item = item)
        }
    }
}

@Composable
fun DonationStepItem(item: CarouselItem) {
    Column(

        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Card(
            shape = RoundedCornerShape(8.dp),
            modifier = Modifier.size(width = 120.dp, 150.dp)
        ) {
            Image(
                painter = painterResource(id = item.backgroundImage),
                contentDescription = "Background Image",
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
        }
        Text(
            text = item.description,
            color = Color.White,
            modifier = Modifier.width(120.dp),
            style = MaterialTheme.typography.bodyMedium
        )
    }

}

@Composable
fun Carousel(pages: List<CarouselItem>) {
    // State for the pager
    val pagerState = rememberPagerState(pageCount = { pages.size })
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        HorizontalPager(
            state = pagerState,
            modifier = Modifier.fillMaxWidth()
        ) { page ->
            CarouselItemCard(item = pages[page])
        }
        Row(
            Modifier
                .wrapContentHeight()
                .fillMaxWidth()
                .padding(bottom = 8.dp),
            horizontalArrangement = Arrangement.Center
        ) {
            repeat(pagerState.pageCount) { iteration ->
                val color =
                    if (pagerState.currentPage == iteration) bloodRed2 else bloodTransparent3
                Box(
                    modifier = Modifier
                        .padding(horizontal = 4.dp, vertical = 4.dp)
                        .clip(CircleShape)
                        .background(color)
                        .size(8.dp)
                )
            }
        }
    }
}

@Composable
fun CarouselItemCard(item: CarouselItem) {
    Card(
        shape = RoundedCornerShape(0.dp),
        //   elevation = CardDefaults.cardElevation(8.dp),
        modifier = Modifier
            .fillMaxWidth()
            .height(250.dp)
    ) {
        Box(modifier = Modifier.fillMaxSize()) {
            // Background image
            Image(
                painter = painterResource(id = item.backgroundImage),
                contentDescription = "Background Image",
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )

            // Gradient overlay
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(
                                Color.Transparent,
                                Color.Black // Adjust alpha for better text visibility
                            ),
                            startY = 300f
                        )
                    )
            )

            // Text content
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                contentAlignment = Alignment.BottomStart
            ) {
                Text(
                    text = item.description,
                    color = Color.White,
                    style = MaterialTheme.typography.bodyMedium,
                    textAlign = TextAlign.Start
                )
            }


        }
    }
}

@Composable
fun AppTopBar() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(fadeBlue11)
            .padding(horizontal = 8.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Center
    ) {
        Image(
            painter = painterResource(id = R.drawable.icon),
            contentDescription = "Custom Image",
            modifier = Modifier.size(50.dp)
        )
        Text(
            text = stringResource(id = R.string.app_name_for_logo),
            color = bloodRed2,
            style = MaterialTheme.typography.titleLarge,
            fontStyle = FontStyle.Italic,
            fontWeight = FontWeight.SemiBold
        )
    }
}


