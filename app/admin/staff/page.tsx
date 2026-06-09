'use client'

import Link from 'next/link'

export default function AdminStaffPage() {
  const staff = [
    { id: 1, name: 'محمد رضا', role: 'مدیر', status: 'active' },
    { id: 2, name: 'سارا علوی', role: 'باریستا', status: 'active' },
    { id: 3, name: 'علی معینی', role: 'باریستا', status: 'inactive' },
    { id: 4, name: 'فاطمه حسنی', role: 'پذیرایی', status: 'active' },
  ]

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">کارکنان</h1>
        <div className="flex gap-2">
          <button className="rounded-lg bg-green px-4 py-2 text-sm text-parchment hover:bg-green/90">
            + اضافه کردن
          </button>
          <Link href="/admin" className="text-green hover:underline">← بازگشت</Link>
        </div>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-right text-sm">
          <thead className="border-b border-line bg-gold/10">
            <tr>
              <th className="px-4 py-3 font-display text-ink">نام</th>
              <th className="px-4 py-3 font-display text-ink">سمت</th>
              <th className="px-4 py-3 font-display text-ink">وضعیت</th>
              <th className="px-4 py-3 font-display text-ink">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id} className="border-b border-line hover:bg-gold/5">
                <td className="px-4 py-3">{member.name}</td>
                <td className="px-4 py-3 text-xs text-ink-soft">{member.role}</td>
                <td className="px-4 py-3">
                  <span className={`rounded px-2 py-1 text-xs font-medium ${
                    member.status === 'active'
                      ? 'bg-green/10 text-green'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {member.status === 'active' ? 'فعال' : 'غیرفعال'}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <button className="text-blue-600 hover:underline ml-3">ویرایش</button>
                  <button className="text-burgundy hover:underline">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
