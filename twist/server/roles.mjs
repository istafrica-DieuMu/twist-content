// Who may do what in Twist Preview. One table, used by the server for every
// check and sent to the browser (/api/me) so the page only offers what works.
//
//   tester    uses the app and leaves feedback; sees only their own feedback
//   manager   a tester who also adds testers, sets and resets their passwords,
//             and sees and resolves the feedback of the testers they added
//   reviewer  sees every comment, jumps to its screen, resolves and reopens
//   admin     everything: every comment, every account and role
// Everyone above tester also gets the team's tools: the Drawings and Task types pages.
export const ROLES = ["tester", "manager", "reviewer", "admin"];
export const ROLE_NAME = { tester: "Tester", manager: "Manager", reviewer: "Reviewer", admin: "Admin" };

const CAN = {
  tester: { comment: true },
  manager: { comment: true, tools: true, seeTeam: true, resolveTeam: true, manageTeam: true },
  reviewer: { comment: true, tools: true, seeAll: true, resolveAll: true },
  admin: { comment: true, tools: true, seeAll: true, resolveAll: true, manageAll: true },
};
export const can = (user) => ({ comment: false, tools: false, seeTeam: false, resolveTeam: false, manageTeam: false, seeAll: false, resolveAll: false, manageAll: false, ...(CAN[user?.role] ?? {}) });
// Pages only the team's tools role may open.
export const TOOL_PAGES = ["/pages/drawings/", "/pages/types/"];

// Somebody in the user's team: an account they added. Managers look after the testers they add.
const inTeam = (user, authorId, accounts) => accounts.some((a) => a.id === authorId && a.createdBy === user.id);

export function canSee(user, fb, accounts) {
  const c = can(user);
  return c.seeAll || fb.author?.id === user.id || (c.seeTeam && inTeam(user, fb.author?.id, accounts));
}
// Resolving and reopening: reviewers and admins anywhere, a manager in their team.
export function canResolve(user, fb, accounts) {
  const c = can(user);
  return c.resolveAll || (c.resolveTeam && (fb.author?.id === user.id || inTeam(user, fb.author?.id, accounts)));
}
// The author edits or deletes a comment while it is open; reviewers and admins may delete any.
export const canEdit = (user, fb) => fb.author?.id === user.id && fb.status === "open";
export const canDelete = (user, fb) => can(user).resolveAll || canEdit(user, fb);

// The accounts a user may see and change on the Users screen.
export function manages(user, account) {
  const c = can(user);
  if (c.manageAll) return true;
  return c.manageTeam && account.createdBy === user.id && account.role === "tester";
}
// The roles a user may hand out: admins any, managers only tester.
export const grantable = (user) => can(user).manageAll ? ROLES : can(user).manageTeam ? ["tester"] : [];
export const managesAnyone = (user) => can(user).manageAll || can(user).manageTeam;
