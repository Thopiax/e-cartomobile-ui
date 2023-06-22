import { Card } from "@tremor/react"

export const Sidebar = () => {
  return (
    <aside className="absolute inset-y-0 left-0 hidden h-screen p-4 md:block md:w-1/3 lg:w-1/4">
      <Card className="flex h-full flex-col gap-6 bg-opacity-80">
        {/* <SidebarTitleInput title={} setTitle={setName} /> */}
      </Card>
    </aside>
  )
}
