import React from 'react'
import Feed from '@/components/community/Feed'
import CreatePostButton from '@/components/community/CreatePostButton'
import { getCommunityPosts } from '@/services/api'
import { revalidatePath } from 'next/cache'

async function getPosts() {
  try {
    const response = await getCommunityPosts()
    console.log('response', response)
    return response.data
  } catch (e) {
    console.error('Error getPosts:', e)
    return dummyPosts
  } finally {
  }
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">SHARE YOUR STORY</h1>
      <CreatePostButton />
      <Feed posts={posts} />
    </main>
  )
}

const dummyPosts = [
  {
    id: 1,
    authorName: 'John Traveler',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    location: 'Paris, France',
    content:
      'The view of Paris from the Eiffel Tower at night is truly magical! You must see it once in your life.',
    image: 'https://picsum.photos/seed/paris/800/600',
  },
  {
    id: 2,
    authorName: 'Emma Explorer',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    location: 'Bangkok, Thailand',
    content:
      'The street food in Bangkok is amazing. You have to try the Pad Thai!',
    image: 'https://picsum.photos/seed/bangkok/800/600',
  },
  {
    id: 3,
    authorName: 'Mike Hiker',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29026804d',
    location: 'Everest Base Camp, Nepal',
    content: 'Finally made it to Everest Base Camp. The altitude is no joke!',
    image: 'https://picsum.photos/seed/everest/800/600',
  },
  {
    id: 4,
    authorName: 'Sophie Foodie',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29026904d',
    location: 'Tokyo, Japan',
    content:
      'Sushi omakase in Tokyo is life-changing. The flavors are out of this world!',
  },
  {
    id: 5,
    authorName: 'David Photographer',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29027004d',
    location: 'Grand Canyon, USA',
    content:
      'Sunrise at the Grand Canyon is breathtaking. No photo can do it justice.',
    image: 'https://picsum.photos/seed/grandcanyon/800/600',
  },
  {
    id: 6,
    authorName: 'Lucy Backpacker',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29027104d',
    location: 'Machu Picchu, Peru',
    content:
      'The hike to Machu Picchu was tough, but totally worth it. What an incredible place!',
    image: 'https://picsum.photos/seed/machupicchu/800/600',
  },
  {
    id: 7,
    authorName: 'Tom Surfer',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29027204d',
    location: 'Bali, Indonesia',
    content:
      'Caught some amazing waves in Bali today. The surfing here is world-class!',
  },
  {
    id: 8,
    authorName: 'Alice Artist',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29027304d',
    location: 'Florence, Italy',
    content:
      'Spending hours in the Uffizi Gallery. The Renaissance art here is simply stunning.',
    image: 'https://picsum.photos/seed/florence/800/600',
  },
  {
    id: 9,
    authorName: 'Robert Adventurer',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29027404d',
    location: 'Amazon Rainforest, Brazil',
    content:
      'Trekking through the Amazon is like entering another world. The biodiversity is incredible!',
    image: 'https://picsum.photos/seed/amazon/800/600',
  },
  {
    id: 10,
    authorName: 'Emily Yoga',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29027504d',
    location: 'Rishikesh, India',
    content:
      'Found inner peace during a yoga retreat in Rishikesh. This place is truly spiritual.',
  },
  {
    id: 11,
    authorName: 'Daniel Historian',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29027604d',
    location: 'Rome, Italy',
    content:
      'Walking through the Colosseum, you can almost hear the roar of the ancient crowds.',
    image: 'https://picsum.photos/seed/rome/800/600',
  },
  {
    id: 12,
    authorName: 'Olivia Marine Biologist',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29027704d',
    location: 'Great Barrier Reef, Australia',
    content:
      'Diving in the Great Barrier Reef is like entering an underwater paradise. So colorful!',
    image: 'https://picsum.photos/seed/reef/800/600',
  },
  {
    id: 13,
    authorName: 'William Mountaineer',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29027804d',
    location: 'Swiss Alps, Switzerland',
    content:
      'Conquered my first 4000m peak in the Swiss Alps today. The view from the top is indescribable.',
  },
  {
    id: 14,
    authorName: 'Sophia Wine Lover',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29027904d',
    location: 'Bordeaux, France',
    content:
      'Tasting some of the finest wines in Bordeaux. Each sip tells a story of the terroir.',
    image: 'https://picsum.photos/seed/bordeaux/800/600',
  },
  {
    id: 15,
    authorName: 'James Architect',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29028004d',
    location: 'Barcelona, Spain',
    content:
      "Gaudi's architecture in Barcelona never ceases to amaze me. La Sagrada Familia is a masterpiece.",
    image: 'https://picsum.photos/seed/barcelona/800/600',
  },
  {
    id: 16,
    authorName: 'Ava Volunteer',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29028104d',
    location: 'Nairobi, Kenya',
    content:
      'Volunteering at a wildlife sanctuary in Nairobi. These elephants are so intelligent and gentle.',
  },
  {
    id: 17,
    authorName: 'Ethan Snowboarder',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29028204d',
    location: 'Whistler, Canada',
    content:
      "Fresh powder day in Whistler! The slopes here are a snowboarder's dream.",
    image: 'https://picsum.photos/seed/whistler/800/600',
  },
  {
    id: 18,
    authorName: 'Mia Chef',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29028304d',
    location: 'New Orleans, USA',
    content:
      'Taking a cooking class in New Orleans. The flavors of Creole cuisine are so rich and complex!',
  },
  {
    id: 19,
    authorName: 'Noah Astronomer',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29028404d',
    location: 'Atacama Desert, Chile',
    content:
      "Stargazing in the Atacama Desert. I've never seen the Milky Way so clearly before.",
    image: 'https://picsum.photos/seed/atacama/800/600',
  },
  {
    id: 20,
    authorName: 'Isabella Dancer',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29028504d',
    location: 'Havana, Cuba',
    content: 'Learning salsa in Havana. The rhythm of this city is infectious!',
    image: 'https://picsum.photos/seed/havana/800/600',
  },
]
