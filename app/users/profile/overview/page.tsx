import ProfileOverviewContent from '@/components/users/profile/ProfileOverviewContent'
import ProfileHeader from '@/components/users/profile/ProfileHeader'
import ProfileNav from '@/components/users/profile/ProfileNav'

export default function ProfileOverview() {
  return (
    <>
      <ProfileHeader />
      <ProfileNav />
      <ProfileOverviewContent />
    </>
  )
}
