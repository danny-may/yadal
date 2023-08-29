export function escapeRegex(text: string): string {
    return text.replaceAll(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
}