import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

export function getStatusColor(status: string): { bg: string; text: string } {
  switch (status.toLowerCase()) {
    case 'important':
      return { bg: 'bg-green-100', text: 'text-green-800' };
    case 'new':
      return { bg: 'bg-blue-100', text: 'text-blue-800' };
    case 'upcoming':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
    case 'completed':
      return { bg: 'bg-green-100', text: 'text-green-800' };
    case 'pending':
      return { bg: 'bg-orange-100', text: 'text-orange-800' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800' };
  }
}

export function getTransactionColor(type: string): { dot: string; text: string } {
  return type === 'income' 
    ? { dot: 'bg-green-500', text: 'text-green-600' } 
    : { dot: 'bg-red-500', text: 'text-red-600' };
}

export function getRandomImageUrl(gender: 'men' | 'women' = 'men'): string {
  const randomNum = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`;
}
