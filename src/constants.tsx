import { t, defineMessage } from '@lingui/macro';

export class Constants {
  static readonly SEARCH_VIEW_TYPE_LOCAL_KEY = 'search_view_type';
  static readonly DEFAULT_PAGE_SIZE = 10;
  static readonly DEFAULT_PAGINATION_OPTIONS = [10, 20, 50, 100];

  static readonly CARD_DEFAULT_PAGE_SIZE = 10;
  static readonly CARD_DEFAULT_PAGINATION_OPTIONS = [10, 20, 50, 100];
  static readonly INSIGHTS_DEPLOYMENT_MODE = 'insights';
  static readonly STANDALONE_DEPLOYMENT_MODE = 'standalone';

  static readonly ADMIN_GROUP = 'system:partner-engineers';
  static PUBLISHED = 'published';

  static CERTIFIED_REPO =
    DEPLOYMENT_MODE === Constants.INSIGHTS_DEPLOYMENT_MODE
      ? 'published'
      : 'rh-certified';

  static NOTCERTIFIED = 'rejected';
  static NEEDSREVIEW = 'staging';

  static PERMISSIONS = [
    {
      name: 'namespaces',
      label: defineMessage({ message: `Collection Namespaces` }),
      object_permissions: [
        'galaxy.add_namespace', // model_permissions.add_namespace
        'galaxy.change_namespace', // (model_permissions.change_namespace)
        'galaxy.delete_namespace', // model_permissions.delete_namespace
        'galaxy.upload_to_namespace', // (model_permissions.upload_to_namespace)
      ],
    },
    {
      name: 'collections',
      label: defineMessage({ message: `Collections` }),
      object_permissions: [
        'ansible.modify_ansible_repo_content', // model_permissions.move_collection
        'ansible.delete_collection', // model_permissions.delete_collection
      ],
    },
    {
      name: 'users',
      label: defineMessage({ message: `Users` }),
      object_permissions: [
        'galaxy.view_user', // model_permissions.view_user
        'galaxy.delete_user', // model_permissions.delete_user
        'galaxy.add_user', // model_permissions.add_user
        'galaxy.change_user', // model_permissions.change_user
      ],
    },
    {
      name: 'groups',
      label: defineMessage({ message: `Groups` }),
      object_permissions: [
        'galaxy.view_group', // model_permissions.view_group
        'galaxy.delete_group', // model_permissions.delete_group
        'galaxy.add_group', // model_permissions.add_group
        'galaxy.change_group', // model_permissions.change_group
      ],
    },
    {
      name: 'remotes',
      label: defineMessage({ message: `Collection Remotes` }),
      object_permissions: [
        'ansible.change_collectionremote', // model_permissions.change_remote
        'ansible.view_collectionremote',
        // 'ansible.add_collectionremote', // (model_permissions.add_remote)
        // 'ansible.delete_collectionremote', // (model_permissions.delete_remote)
      ],
    },
    {
      name: 'containers',
      label: defineMessage({ message: `Containers` }),
      object_permissions: [
        // Turning off private container permissions since they aren't supported yet
        // 'container.namespace_pull_containerdistribution',
        // 'container.namespace_view_containerdistribution',

        // 'container.add_containerrepository', // (model_permissions.add_containerrepository)
        // 'container.change_containerrepository', // (model_permissions.change_containerrepository)
        'container.delete_containerrepository', // model_permissions.delete_containerrepository

        'container.namespace_change_containerdistribution',
        'container.namespace_modify_content_containerpushrepository',
        'container.namespace_push_containerdistribution',

        'container.add_containernamespace', // (model_permissions.add_containernamespace)
        'container.change_containernamespace', // (model_permissions.change_containernamespace)
        // 'container.delete_containernamespace', // (model_permissions.delete_containernamespace)
      ],
    },
    {
      name: 'registries',
      label: defineMessage({ message: `Remote Registries` }),
      object_permissions: [
        'galaxy.add_containerregistryremote', // model_permissions.add_containerregistry
        'galaxy.change_containerregistryremote', // model_permissions.change_containerregistry
        'galaxy.delete_containerregistryremote', // model_permissions.delete_containerregistry
      ],
    },
    {
      name: 'task_management',
      label: defineMessage({ message: `Task Management` }),
      object_permissions: [
        'core.change_task',
        'core.delete_task',
        'core.view_task',
      ],
    },

    // These aren't currently used. Removing them to reduce confusion in the UI
    // {
    //   name: 'distribution',
    //   label: '...',
    //   object_permissions: [
    //     'ansible.view_ansibledistribution', // (model_permissions.view_distribution)
    //     'ansible.add_ansibledistribution', // (model_permissions.add_distribution)
    //     'ansible.change_ansibledistribution', // (model_permissions.change_distribution)
    //     'ansible.delete_ansibledistribution', // (model_permissions.delete_distribution)
    //   ],
    // },
    // {
    //   name: 'synclists',
    //   label: '...',
    //   object_permissions: [
    //     'galaxy.delete_synclist',
    //     'galaxy.change_synclist',
    //     'galaxy.view_synclist',
    //     'galaxy.add_synclist',
    //   ],
    // },
    // {
    //   name: 'container_distribution',
    //   label: '...',
    //   object_permissions: [
    //     'container.add_containerdistribution', // (model_permissions.add_containerdistribution)
    //     'container.change_containerdistribution', // (model_permissions.change_containerdistribution)
    //     'container.delete_containerdistribution', // (model_permissions.delete_containerdistribution)
    //   ],
    // },
  ];

  static USER_GROUP_MGMT_PERMISSIONS = [
    'galaxy.delete_user',
    'galaxy.add_user',
    'galaxy.change_user',
    'galaxy.delete_group',
    'galaxy.add_group',
  ];

  static HUMAN_PERMISSIONS = {
    'ansible.add_ansibledistribution': t`Add Ansible distribution`,
    'ansible.add_collectionremote': t`Add collection remote`,
    'ansible.change_ansibledistribution': t`Change Ansible distribution`,
    'ansible.change_collectionremote': t`Change collection remote`,
    'ansible.delete_ansibledistribution': t`Delete Ansible distribution`,
    'ansible.delete_collection': t`Delete collection`,
    'ansible.delete_collectionremote': t`Delete collection remote`,
    'ansible.modify_ansible_repo_content': t`Modify Ansible repo content`,
    'ansible.view_ansibledistribution': t`View Ansible distribution`,
    'ansible.view_collectionremote': t`View collection remote`,
    'container.add_containerdistribution': t`Add container distribution`,
    'container.add_containernamespace': t`Create new containers`,
    'container.add_containerrepository': t`Add container repository`,
    'container.change_containerdistribution': t`Change container distribution`,
    'container.change_containernamespace': t`Change container namespace permissions`,
    'container.change_containerrepository': t`Change container repository`,
    'container.delete_containerdistribution': t`Delete container distribution`,
    'container.delete_containernamespace': t`Delete container namespace`,
    'container.delete_containerrepository': t`Delete container repository`,
    'container.namespace_change_containerdistribution': t`Change containers`,
    'container.namespace_modify_content_containerpushrepository': t`Change image tags`,
    'container.namespace_pull_containerdistribution': t`Pull private containers`,
    'container.namespace_push_containerdistribution': t`Push to existing containers`,
    'container.namespace_view_containerdistribution': t`View private containers`,
    'core.change_task': t`Change task`,
    'core.delete_task': t`Delete task`,
    'core.view_task': t`View all tasks`,
    'galaxy.add_containerregistryremote': t`Add remote registry`,
    'galaxy.add_group': t`Add group`,
    'galaxy.add_namespace': t`Add namespace`,
    'galaxy.add_synclist': t`Add synclist`,
    'galaxy.add_user': t`Add user`,
    'galaxy.change_containerregistryremote': t`Change remote registry`,
    'galaxy.change_group': t`Change group`,
    'galaxy.change_namespace': t`Change namespace`,
    'galaxy.change_synclist': t`Change synclist`,
    'galaxy.change_user': t`Change user`,
    'galaxy.delete_containerregistryremote': t`Delete remote registry`,
    'galaxy.delete_group': t`Delete group`,
    'galaxy.delete_namespace': t`Delete namespace`,
    'galaxy.delete_synclist': t`Delete synclist`,
    'galaxy.delete_user': t`Delete user`,
    'galaxy.upload_to_namespace': t`Upload to namespace`,
    'galaxy.view_group': t`View group`,
    'galaxy.view_synclist': t`View synclist`,
    'galaxy.view_user': t`View user`,
  };

  static GROUP_HUMAN_PERMISSIONS = {
    change_namespace: t`Change namespace`,
    upload_to_namespace: t`Upload to namespace`,
    add_containernamespace: t`Create new containers`,
    namespace_pull_containerdistribution: t`Pull private containers`,
    namespace_change_containerdistribution: t`Update container information`,
    namespace_view_containerdistribution: t`View private containers`,
    namespace_modify_content_containerpushrepository: t`Change image tags`,
    change_containernamespace: t`Change container namespace permissions`,
    namespace_push_containerdistribution: t`Push images to existing containers`,
    view_containernamespace: t`View container's namespace`,
    delete_containernamespace: t`Delete container's namespace`,
    namespace_delete_containerdistribution: t`Delete container's distribution`,
    namespace_view_containerpushrepository: t`View container's repository`,
    namespace_add_containerdistribution: t`Push new containers`,
    change_containerdistribution: t`Change distribution`,
    delete_containerdistribution: t`Delete distribution`,
    push_containerdistribution: t`Push distribution`,
    pull_containerdistribution: t`Pull distribution`,
    view_containerdistribution: t`View distribution`,
  };

  static CONTAINER_NAMESPACE_PERMISSIONS = [
    'change_containernamespace',
    'namespace_push_containerdistribution',
    'namespace_change_containerdistribution',
    'namespace_modify_content_containerpushrepository',
    'namespace_add_containerdistribution',
  ];
  static UPSTREAM_HOSTS = [
    'galaxy.ansible.com',
    'galaxy-dev.ansible.com',
    'galaxy-qa.ansible.com',
  ];
  static DOWNSTREAM_HOSTS = [
    // FIXME 2021-09: remove obsolete cloud* references
    'cloud.redhat.com',
    'cloud.stage.redhat.com',
    'ci.cloud.redhat.com',
    'qa.cloud.redhat.com',

    'console.redhat.com',
    'console.stage.redhat.com',
    'ci.console.redhat.com',
    'qa.console.redhat.com',
  ];

  static REPOSITORYNAMES = {
    published: defineMessage({ message: `Published` }),
    'rh-certified': defineMessage({ message: `Red Hat Certified` }),
    community: defineMessage({ message: `Community` }),
    validated: defineMessage({ message: `Validated` }),
  };

  static ALLOWEDREPOS = ['community', 'published', 'rh-certified', 'validated'];

  static COLLECTION_FILTER_TAGS = [
    'application',
    'cloud',
    'database',
    'infrastructure',
    'linux',
    'monitoring',
    'networking',
    'security',
    'storage',
    'tools',
    'windows',
  ];

  static TASK_NAMES = {
    'galaxy_ng.app.tasks.promotion._remove_content_from_repository':
      defineMessage({ message: `Remove content from repository` }),
    'galaxy_ng.app.tasks.publishing.import_and_auto_approve': defineMessage({
      message: `Import and auto approve`,
    }),
    'galaxy_ng.app.tasks.curate_synclist_repository': defineMessage({
      message: `Curate synclist repository`,
    }),
    'galaxy_ng.app.tasks.import_and_move_to_staging': defineMessage({
      message: `Import and move to staging`,
    }),
    'galaxy_ng.app.tasks.import_and_auto_approve': defineMessage({
      message: `Import and auto approve`,
    }),
    'galaxy_ng.app.tasks.curate_all_synclist_repository': defineMessage({
      message: `Curate all synclist repository`,
    }),
    'galaxy_ng.app.tasks.synclist.curate_synclist_repository_batch':
      defineMessage({ message: `Curate synclist repository batch` }),
    'pulp_ansible.app.tasks.collections.sync': defineMessage({
      message: `Pulp Ansible: Collections sync`,
    }),
    'pulp_ansible.app.tasks.copy.copy_content': defineMessage({
      message: `Pulp ansible: Copy content`,
    }),
    'pulp_ansible.app.tasks.collections.collection_sync': defineMessage({
      message: `Pulp ansible: collection sync`,
    }),
    'pulp_ansible.app.tasks.roles.synchronize': defineMessage({
      message: `Pulp Ansible: Roles synchronize`,
    }),
    'pulp_ansible.app.tasks.collections.update_collection_remote':
      defineMessage({ message: `Pulp ansible: Update collection remote` }),
    'pulp_ansible.app.tasks.collections.import_collection': defineMessage({
      message: `Pulp ansible: Import collection`,
    }),
    'pulp_container.app.tasks.tag_image': defineMessage({
      message: `Pulp container: Tag image`,
    }),
    'pulp_container.app.tasks.untag_image': defineMessage({
      message: `Pulp container: Untage image`,
    }),
    'pulp_container.app.tasks.synchronize': defineMessage({
      message: `Pulp container: Tasks synchronize`,
    }),
    'pulp_container.app.tasks.recursive_add_content': defineMessage({
      message: `Pulp container: Recursive add content`,
    }),
    'pulp_container.app.tasks.recursive_remove_content': defineMessage({
      message: `Pulp container: Recursive remove content`,
    }),
    'pulp_container.app.tasks.build_image_from_containerfile': defineMessage({
      message: `Pulp container: Build image from containerfile`,
    }),
    'pulp_container.app.tasks.general_multi_delete': defineMessage({
      message: `Pulp container: General multi delete`,
    }),
    'pulpcore.tasking.tasks.import_repository_version': defineMessage({
      message: `Pulpcore: Import repository version`,
    }),
    'pulpcore.tasking.tasks.orphan_cleanup': defineMessage({
      message: `Pulpcore: Orphan cleanup`,
    }),
    'pulpcore.tasking.tasks.repair_all_artifacts': defineMessage({
      message: `Pulpcore: Repair all artifacts`,
    }),
    'pulpcore.tasking.tasks.base.general_create': defineMessage({
      message: `Pulpcore: General create`,
    }),
    'pulpcore.tasking.tasks.base.general_update': defineMessage({
      message: `Pulpcore: General update`,
    }),
    'pulpcore.tasking.tasks.base.general_delete': defineMessage({
      message: `Pulpcore: General delete`,
    }),
    'pulpcore.app.tasks.export.pulp_export': defineMessage({
      message: `Pulpcore: Pulp export`,
    }),
    'pulpcore.app.tasks.pulp_import': defineMessage({
      message: `Pulpcore: Pulp import`,
    }),
    'pulpcore.app.tasks.repository.delete_version': defineMessage({
      message: `Pulpcore: Delete version`,
    }),
    'pulpcore.app.tasks.repository.repair_version': defineMessage({
      message: `Pulpcore: Repair version`,
    }),
    'pulpcore.app.tasks.upload.commit': defineMessage({
      message: `Pulpcore: Upload commit`,
    }),
    'pulpcore.app.tasks.repository.add_and_remove': defineMessage({
      message: `Pulpcore: Add and remove`,
    }),
    'pulpcore.plugin.tasking.add_and_remove': defineMessage({
      message: `Pulpcore: Add or remove`,
    }),
  };

  static HUMAN_STATUS = {
    completed: t`Completed`,
    failed: t`Failed`,
    running: t`Running`,
    waiting: t`Waiting`,
  };

  static LOCKED_ROLES_WITH_DESCRIPTION = {
    // galaxy roles
    'galaxy.content_admin': t`Manage all content types.`,
    'galaxy.collection_admin': t`Create, delete and change collection namespaces. Upload and delete collections. Sync collections from remotes. Approve and reject collections.`,
    'galaxy.collection_publisher': t`Upload and modify collections.`,
    'galaxy.collection_curator': t`Approve, reject and sync collections from remotes.`,
    'galaxy.collection_namespace_owner': t`Change and upload collections to namespaces.`,
    'galaxy.execution_environment_admin': t`Push, delete, and change execution environments. Create, delete and change remote registries.`,
    'galaxy.execution_environment_publisher': t`Push, and change execution environments.`,
    'galaxy.execution_environment_namespace_owner': t`Create and update execution environments under existing container namespaces.`,
    'galaxy.execution_environment_collaborator': t`Change existing execution environments.`,
    'galaxy.group_admin': t`View, add, remove and change groups.`,
    'galaxy.user_admin': t`View, add, remove and change users.`,
    'galaxy.synclist_owner': t`View, add, remove and change synclists.`,
    'galaxy.task_admin': t`View, and cancel any task.`,

    // core roles
    'core.task_owner': t`Allow all actions on a task.`,
    'core.taskschedule_owner': t`Allow all actions on a taskschedule.`,
  };
}
