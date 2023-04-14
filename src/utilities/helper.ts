interface IFullName {
    username: string,
    first_name?: string,
    last_name?: string
}
export function fullName(member: IFullName): string {
    const fullName = member.first_name ? `${member.first_name} ${member.last_name || ''}` : member.username;

    return fullName;
}